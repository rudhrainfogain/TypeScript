"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//Project State Management
class ProjectState {
    //private constructor so that class cant be instantiated from outside
    constructor() {
        //field to store projects
        this.projects = [];
        //field for listeners
        this.listeners = [];
    }
    //static method to get instance of this class
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        else {
            this.instance = new ProjectState();
            return this.instance;
        }
    }
    //public method to addProjects to above array
    addProject(title, description, numOfPeople) {
        //create a new project
        const newProject = {
            projectId: Math.random().toString(),
            title: title,
            description: description,
            numOfPeople: numOfPeople
        };
        //add this project to projects array
        this.projects.push(newProject);
        //call all listener functions whenever a new project is added
        for (const listenerFn of this.listeners) {
            //call listener function passing the copy of projects array
            listenerFn(this.projects.slice());
        }
    }
    // method to register a new listener
    addListener(listener) {
        //add the listener to listeners array
        this.listeners.push(listener);
    }
}
//Global constant representing the application state
const projectState = ProjectState.getInstance();
//Autobind decorator
function autobind(_target, _methodName, descriptor) {
    //get handle to original method
    const originalMethod = descriptor.value;
    //create adjusted propertyDescriptor
    const adjustedDescriptor = {
        //set it to configurable
        configurable: true,
        //create a getter
        get() {
            //create the bound function
            const boundFunction = originalMethod.bind(this);
            //return the bound function
            return boundFunction;
        }
    };
    //return the adjusted descriptor
    return adjustedDescriptor;
}
//validate function
function validate(validatebleInput) {
    let isValid = true;
    //required validation
    if (validatebleInput.required) {
        isValid = isValid && validatebleInput.value.toString().trim().length !== 0;
    }
    //validations for string
    if (typeof validatebleInput.value === 'string') {
        //min length validation
        if (validatebleInput.minLength != null) {
            isValid =
                isValid && validatebleInput.value.length >= validatebleInput.minLength;
        }
        //max length validation
        if (validatebleInput.maxLength != null) {
            isValid =
                isValid && validatebleInput.value.length <= validatebleInput.maxLength;
        }
    }
    //validations for number
    if (typeof validatebleInput.value === 'number') {
        //min length validation
        if (validatebleInput.min != null) {
            isValid = isValid && validatebleInput.value >= validatebleInput.min;
        }
        //max length validation
        if (validatebleInput.max != null) {
            isValid = isValid && validatebleInput.value <= validatebleInput.max;
        }
    }
    //return final validation result
    return isValid;
}
//Project List class
class ProjectList {
    constructor(type) {
        this.type = type;
        //get access to template and div
        this.templateElement = document.getElementById('project-list');
        this.hostElement = document.getElementById('app');
        //import content from template
        const importedNode = document.importNode(this.templateElement.content, true);
        //access the section
        this.element = importedNode.firstElementChild;
        //Add style to form dynamically based on the type of project
        this.element.id = `${this.type}-projects`;
        //set assigned projects to an empty array
        this.assignedProjects = [];
        //add a listener to project state
        projectState.addListener((projects) => {
            //save projects array copy to assignedProjects
            this.assignedProjects = projects;
            //call method to render all projects to list
            this.renderProjects();
        });
        //add element to dom
        this.attach();
        //render data
        this.renderContent();
    }
    //method to render projects to list
    renderProjects() {
        //fetch the list
        const listElement = document.getElementById(`${this.type}-projects-list`);
        //loop through all the projects
        for (const project of this.assignedProjects) {
            //create a new list item
            const listItem = document.createElement('li');
            //set text of list item to project title
            listItem.textContent = project.title;
            //add list item to the list
            listElement.appendChild(listItem);
        }
    }
    renderContent() {
        //Create id for ul dynamically based on the type of project
        const listId = `${this.type}-projects-list`;
        //fetch the ul tag and add this id to it
        this.element.querySelector('ul').id = listId;
        //fetch the h2 tag and set its value dynamically based on the type of project
        this.element.querySelector('h2').textContent =
            this.type.toUpperCase() + ' PROJECTS';
    }
    attach() {
        //add element to div
        this.hostElement.insertAdjacentElement('beforeend', this.element);
    }
}
//Project Input class
class ProjectInput {
    constructor() {
        //get access to template and div
        this.templateElement = document.getElementById('project-input');
        this.hostElement = document.getElementById('app');
        //import content from template
        const importedNode = document.importNode(this.templateElement.content, true);
        //access the form
        this.element = importedNode.firstElementChild;
        //Add style to form
        this.element.id = 'user-input';
        //get access to input elements
        this.titleInputElement = this.element.querySelector('#title');
        this.descriptionInputElement = this.element.querySelector('#description');
        this.peopleInputElement = this.element.querySelector('#people');
        //handle submit event
        this.configure();
        //add element to dom
        this.attach();
    }
    attach() {
        //add element to div
        this.hostElement.insertAdjacentElement('afterbegin', this.element);
    }
    submitHandler(event) {
        event.preventDefault();
        //call gatherUserInput to gather the data received in form after validation
        const userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            //if data is use destructuring to get indivisual values
            const [title, description, people] = userInput;
            //print values to console
            console.log('title is : ' +
                title +
                ' description is : ' +
                description +
                ' no of people is : ' +
                people);
            //add project to global state
            projectState.addProject(title, description, people);
        }
        //clear user input from form
        this.clearUserInput();
    }
    clearUserInput() {
        //clear the entered values from the form
        this.titleInputElement.value = '';
        this.descriptionInputElement.value = '';
        this.peopleInputElement.value = '';
    }
    gatherUserInput() {
        //fetch user input from inputElements
        const titleInput = this.titleInputElement.value;
        const descriptionInput = this.descriptionInputElement.value;
        const peopleInput = this.peopleInputElement.value;
        //Create validatabale objects for user inputs
        const validatableTitle = {
            value: titleInput,
            required: true
        };
        const validatableDescription = {
            value: descriptionInput,
            required: true,
            minLength: 5
        };
        const validatablePeople = {
            value: +peopleInput,
            required: true,
            min: 1,
            max: 5
        };
        //validate the input by calling validate function
        if (!validate(validatableTitle) ||
            !validate(validatableDescription) ||
            !validate(validatablePeople)) {
            //show alert for invalid input
            alert('Invalid input please try again!!!!');
        }
        else {
            //return tuple if input is valid
            return [titleInput, descriptionInput, +peopleInput];
        }
    }
    configure() {
        //handle submit event of form
        this.element.addEventListener('submit', this.submitHandler);
    }
}
__decorate([
    autobind
], ProjectInput.prototype, "submitHandler", null);
const prjInput = new ProjectInput();
const activeProjectsList = new ProjectList('active');
const finishedProjectsList = new ProjectList('finished');
//# sourceMappingURL=app.js.map