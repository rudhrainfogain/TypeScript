"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//Project Status
var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus[ProjectStatus["Active"] = 0] = "Active";
    ProjectStatus[ProjectStatus["Finished"] = 1] = "Finished";
})(ProjectStatus || (ProjectStatus = {}));
//Project
class Project {
    constructor(projectId, title, description, numOfPeople, status) {
        this.projectId = projectId;
        this.title = title;
        this.description = description;
        this.numOfPeople = numOfPeople;
        this.status = status;
    }
}
//Base state class
class State {
    constructor() {
        //field for listeners
        this.listeners = [];
    }
    // method to register a new listener
    addListener(listener) {
        //add the listener to listeners array
        this.listeners.push(listener);
    }
}
//Project State Management
class ProjectState extends State {
    //private constructor so that class cant be instantiated from outside
    constructor() {
        super();
        //field to store projects
        this.projects = [];
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
        const newProject = new Project(Math.random().toString(), title, description, numOfPeople, ProjectStatus.Active);
        //add this project to projects array
        this.projects.push(newProject);
        //call all listener functions whenever a new project is added
        for (const listenerFn of this.listeners) {
            //call listener function passing the copy of projects array
            listenerFn(this.projects.slice());
        }
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
//Component base calss
class Component {
    constructor(templateId, hostId, attachPosition, elementId) {
        this.attachPosition = attachPosition;
        //get access to template and host element
        this.templateElement = document.getElementById(templateId);
        this.hostElement = document.getElementById(hostId);
        //import content from template
        const importedNode = document.importNode(this.templateElement.content, true);
        //access the element
        this.element = importedNode.firstElementChild;
        //Add id
        if (elementId) {
            this.element.id = elementId;
        }
        //add element to dom
        this.attach();
    }
    attach() {
        //add element to host
        this.hostElement.insertAdjacentElement(this.attachPosition, this.element);
    }
}
//ProjectItem class to add a item to list
class ProjectItem extends Component {
    //Constructor
    constructor(hostId, project) {
        super('single-project', hostId, 'beforeend', project.projectId);
        this.project = project;
        //call configure method
        this.configure();
        //call rendercontent method
        this.renderContent();
    }
    get persons() {
        if (this.project.numOfPeople === 1) {
            return '1 person';
        }
        else {
            return `${this.project.numOfPeople} persons`;
        }
    }
    dragStartHandler(event) {
        console.log('drag start', event);
    }
    dragEndHandler(event) {
        console.log('drag end', event);
    }
    configure() {
        //add event listener to listen to dragstart event
        this.element.addEventListener('dragstart', this.dragStartHandler);
    }
    renderContent() {
        //select elements and set project details
        this.element.querySelector('h2').textContent = this.project.title;
        this.element.querySelector('h3').textContent = this.persons + ' assigned';
        this.element.querySelector('p').textContent = this.project.description;
    }
}
__decorate([
    autobind
], ProjectItem.prototype, "dragStartHandler", null);
//Project List class
class ProjectList extends Component {
    constructor(type) {
        super('project-list', 'app', 'beforeend', `${type}-projects`);
        this.type = type;
        //set assigned projects to an empty array
        this.assignedProjects = [];
        //add a listener to project state
        this.configure();
        //render data
        this.renderContent();
    }
    dragOverHandler(event) {
        console.log('dragover', event);
        //Fetch the ul element
        const listEl = this.element.querySelector('ul');
        //add droppable class to change ui on drag over
        listEl.classList.add('droppable');
    }
    dropHandler(event) {
        console.log('drop', event);
    }
    dragLeaveHandler(event) {
        console.log('dragLeave', event);
        //Fetch the ul element
        const listEl = this.element.querySelector('ul');
        //remove the droppable class to revert ui changes on drag leave
        listEl.classList.remove('droppable');
    }
    //add listener logic now resides in configure
    configure() {
        //add listeners for drag drop events
        this.element.addEventListener('dragover', this.dragOverHandler);
        this.element.addEventListener('drop', this.dropHandler);
        this.element.addEventListener('dragleave', this.dragLeaveHandler);
        //add a listener to project state
        projectState.addListener((projects) => {
            //filter the projects list based on status
            const relevantProjects = projects.filter(prj => {
                if (this.type === 'active') {
                    return prj.status === ProjectStatus.Active;
                }
                return prj.status === ProjectStatus.Finished;
            });
            //save relevant array to assignedProjects
            this.assignedProjects = relevantProjects;
            //call method to render all projects to list
            this.renderProjects();
        });
    }
    //method to render projects to list
    renderProjects() {
        //fetch the list
        const listElement = document.getElementById(`${this.type}-projects-list`);
        //clear already rendered items
        listElement.innerHTML = '';
        //loop through all the projects
        for (const project of this.assignedProjects) {
            //instantiate new ProjectItem to render to list
            new ProjectItem(this.element.querySelector('ul').id, project);
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
}
__decorate([
    autobind
], ProjectList.prototype, "dragOverHandler", null);
__decorate([
    autobind
], ProjectList.prototype, "dropHandler", null);
__decorate([
    autobind
], ProjectList.prototype, "dragLeaveHandler", null);
//Project Input class
class ProjectInput extends Component {
    constructor() {
        super('project-input', 'app', 'afterbegin', 'user-input');
        //get access to input elements
        this.titleInputElement = this.element.querySelector('#title');
        this.descriptionInputElement = this.element.querySelector('#description');
        this.peopleInputElement = this.element.querySelector('#people');
        //handle submit event
        this.configure();
    }
    renderContent() { }
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