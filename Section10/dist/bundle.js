"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var App;
(function (App) {
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
    App.Component = Component;
})(App || (App = {}));
var App;
(function (App) {
    //validate function
    function validate(validatebleInput) {
        let isValid = true;
        //required validation
        if (validatebleInput.required) {
            isValid =
                isValid && validatebleInput.value.toString().trim().length !== 0;
        }
        //validations for string
        if (typeof validatebleInput.value === 'string') {
            //min length validation
            if (validatebleInput.minLength != null) {
                isValid =
                    isValid &&
                        validatebleInput.value.length >= validatebleInput.minLength;
            }
            //max length validation
            if (validatebleInput.maxLength != null) {
                isValid =
                    isValid &&
                        validatebleInput.value.length <= validatebleInput.maxLength;
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
    App.validate = validate;
})(App || (App = {}));
//Autobind decorator
var App;
(function (App) {
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
    App.autobind = autobind;
})(App || (App = {}));
var App;
(function (App) {
    //Project Status
    let ProjectStatus;
    (function (ProjectStatus) {
        ProjectStatus[ProjectStatus["Active"] = 0] = "Active";
        ProjectStatus[ProjectStatus["Finished"] = 1] = "Finished";
    })(ProjectStatus = App.ProjectStatus || (App.ProjectStatus = {}));
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
    App.Project = Project;
})(App || (App = {}));
/// <reference path ="../models/project.ts" />
var App;
(function (App) {
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
            const newProject = new App.Project(Math.random().toString(), title, description, numOfPeople, App.ProjectStatus.Active);
            //add this project to projects array
            this.projects.push(newProject);
            //call all listener functions whenever a new project is added
            this.updateListeners();
        }
        moveProject(projectId, newStatus) {
            //find the project based on project id
            const project = this.projects.find(prj => prj.projectId === projectId);
            //move only if project status is changed
            if (project && project.status !== newStatus) {
                //if project is found change its status to one supplied
                project.status = newStatus;
                //call all listener functions whenever a project is moved
                this.updateListeners();
            }
        }
        updateListeners() {
            for (const listenerFn of this.listeners) {
                //call listener function passing the copy of projects array
                listenerFn(this.projects.slice());
            }
        }
    }
    App.ProjectState = ProjectState;
    //Global constant representing the application state
    App.projectState = ProjectState.getInstance();
})(App || (App = {}));
/// <reference path ="base-component.ts" />
/// <reference path ="../util/validation.ts" />
/// <reference path ="../decorators/autobind.ts" />
/// <reference path ="../state/project-state.ts" />
var App;
(function (App) {
    //Project Input class
    class ProjectInput extends App.Component {
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
                App.projectState.addProject(title, description, people);
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
            if (!App.validate(validatableTitle) ||
                !App.validate(validatableDescription) ||
                !App.validate(validatablePeople)) {
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
        App.autobind
    ], ProjectInput.prototype, "submitHandler", null);
    App.ProjectInput = ProjectInput;
})(App || (App = {}));
/// <reference path ="base-component.ts" />
/// <reference path ="../decorators/autobind.ts" />
/// <reference path ="../state/project-state.ts" />
/// <reference path ="../models/drag-drop.ts" />
/// <reference path ="../models/project.ts" />
var App;
(function (App) {
    //Project List class
    class ProjectList extends App.Component {
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
            //check if we need to allow the drop
            if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
                //allow the drop
                event.preventDefault();
                //Fetch the ul element
                const listEl = this.element.querySelector('ul');
                //add droppable class to change ui on drag over
                listEl.classList.add('droppable');
            }
        }
        dropHandler(event) {
            const projectId = event.dataTransfer.getData('text/plain');
            App.projectState.moveProject(projectId, this.type === 'active' ? App.ProjectStatus.Active : App.ProjectStatus.Finished);
            //Fetch the ul element
            const listEl = this.element.querySelector('ul');
            //remove the droppable class to revert ui changes after drop end
            listEl.classList.remove('droppable');
        }
        dragLeaveHandler(event) {
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
            App.projectState.addListener((projects) => {
                //filter the projects list based on status
                const relevantProjects = projects.filter(prj => {
                    if (this.type === 'active') {
                        return prj.status === App.ProjectStatus.Active;
                    }
                    return prj.status === App.ProjectStatus.Finished;
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
                new App.ProjectItem(this.element.querySelector('ul').id, project);
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
        App.autobind
    ], ProjectList.prototype, "dragOverHandler", null);
    __decorate([
        App.autobind
    ], ProjectList.prototype, "dropHandler", null);
    __decorate([
        App.autobind
    ], ProjectList.prototype, "dragLeaveHandler", null);
    App.ProjectList = ProjectList;
})(App || (App = {}));
/// <reference path ="components/project-input.ts" />
/// <reference path ="components/project-list.ts" />
var App;
(function (App) {
    new App.ProjectInput();
    new App.ProjectList('active');
    new App.ProjectList('finished');
})(App || (App = {}));
/// <reference path ="base-component.ts" />
/// <reference path ="../decorators/autobind.ts" />
/// <reference path ="../models/project.ts" />
/// <reference path ="../models/drag-drop.ts" />
var App;
(function (App) {
    //ProjectItem class to add a item to list
    class ProjectItem extends App.Component {
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
            //set data to be transfered
            event.dataTransfer.setData('text/plain', this.project.projectId);
            //set the allowed effect to move to signify the intent of moving the item for cursor changes on ui
            event.dataTransfer.effectAllowed = 'move';
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
            this.element.querySelector('h3').textContent =
                this.persons + ' assigned';
            this.element.querySelector('p').textContent = this.project.description;
        }
    }
    __decorate([
        App.autobind
    ], ProjectItem.prototype, "dragStartHandler", null);
    App.ProjectItem = ProjectItem;
})(App || (App = {}));
//# sourceMappingURL=bundle.js.map