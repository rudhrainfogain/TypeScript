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
        //add element to dom
        this.attach();
    }
    attach() {
        //add element to div
        this.hostElement.insertAdjacentElement('afterbegin', this.element);
    }
}
const prjInput = new ProjectInput();
//# sourceMappingURL=app.js.map