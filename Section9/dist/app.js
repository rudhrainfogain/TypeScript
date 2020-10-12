"use strict";
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
        console.log(this.titleInputElement.value);
    }
    configure() {
        //handle submit event of form
        this.element.addEventListener('submit', this.submitHandler.bind(this));
    }
}
const prjInput = new ProjectInput();
//# sourceMappingURL=app.js.map