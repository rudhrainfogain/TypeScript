"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
        //validate the input
        if (titleInput.trim().length === 0 ||
            descriptionInput.trim().length === 0 ||
            peopleInput.trim().length === 0) {
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
//# sourceMappingURL=app.js.map