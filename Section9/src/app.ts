class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;
  constructor() {
    //get access to template and div
    this.templateElement = document.getElementById(
      'project-input'
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById('app')! as HTMLDivElement;

    //import content from template
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    //access the form
    this.element = importedNode.firstElementChild as HTMLFormElement;
    //Add style to form
    this.element.id = 'user-input';

    //get access to input elements
    this.titleInputElement = this.element.querySelector(
      '#title'
    ) as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector(
      '#description'
    ) as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector(
      '#people'
    ) as HTMLInputElement;

    //handle submit event
    this.configure();
    //add element to dom
    this.attach();
  }

  private attach() {
    //add element to div
    this.hostElement.insertAdjacentElement('afterbegin', this.element);
  }
  private submitHandler(event: Event) {
    event.preventDefault();
    console.log(this.titleInputElement.value);
  }
  private configure() {
    //handle submit event of form
    this.element.addEventListener('submit', this.submitHandler.bind(this));
  }
}
const prjInput = new ProjectInput();
