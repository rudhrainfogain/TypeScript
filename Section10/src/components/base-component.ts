namespace App {
  //Component base calss
  export abstract class Component<
    T extends HTMLElement,
    U extends HTMLElement
  > {
    templateElement: HTMLTemplateElement;
    hostElement: T;
    element: U;
    constructor(
      templateId: string,
      hostId: string,
      private attachPosition:
        | 'beforeend'
        | 'beforebegin'
        | 'afterbegin'
        | 'afterend',
      elementId?: string
    ) {
      //get access to template and host element
      this.templateElement = document.getElementById(
        templateId
      )! as HTMLTemplateElement;
      this.hostElement = document.getElementById(hostId)! as T;

      //import content from template
      const importedNode = document.importNode(
        this.templateElement.content,
        true
      );
      //access the element
      this.element = importedNode.firstElementChild as U;
      //Add id
      if (elementId) {
        this.element.id = elementId;
      }
      //add element to dom
      this.attach();
    }
    private attach() {
      //add element to host
      this.hostElement.insertAdjacentElement(this.attachPosition, this.element);
    }
    abstract configure(): void;
    abstract renderContent(): void;
  }
}
