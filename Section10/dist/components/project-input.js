var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from './base-component.js';
import { autobind as Autobind } from '../decorators/autobind.js';
import { projectState } from '../state/project-state.js';
import * as Validation from '../util/validation.js';
//Project Input class
export class ProjectInput extends Component {
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
        if (!Validation.validate(validatableTitle) ||
            !Validation.validate(validatableDescription) ||
            !Validation.validate(validatablePeople)) {
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
    Autobind
], ProjectInput.prototype, "submitHandler", null);
//# sourceMappingURL=project-input.js.map