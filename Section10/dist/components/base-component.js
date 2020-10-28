//Component base calss
export class Component {
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
//# sourceMappingURL=base-component.js.map