//Autobind decorator
function autobind(
  _target: any,
  _methodName: string,
  descriptor: PropertyDescriptor
) {
  //get handle to original method
  const originalMethod = descriptor.value;
  //create adjusted propertyDescriptor
  const adjustedDescriptor: PropertyDescriptor = {
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
  @autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    //call gatherUserInput to gather the data received in form after validation
    const userInput = this.gatherUserInput();
    if (Array.isArray(userInput)) {
      //if data is use destructuring to get indivisual values
      const [title, description, people] = userInput;
      //print values to console
      console.log(
        'title is : ' +
          title +
          ' description is : ' +
          description +
          ' no of people is : ' +
          people
      );
    }
    //clear user input from form
    this.clearUserInput();
  }
  private clearUserInput() {
    //clear the entered values from the form
    this.titleInputElement.value = '';
    this.descriptionInputElement.value = '';
    this.peopleInputElement.value = '';
  }
  private gatherUserInput(): [string, string, number] | void {
    //fetch user input from inputElements
    const titleInput = this.titleInputElement.value;
    const descriptionInput = this.descriptionInputElement.value;
    const peopleInput = this.peopleInputElement.value;

    //validate the input
    if (
      titleInput.trim().length === 0 ||
      descriptionInput.trim().length === 0 ||
      peopleInput.trim().length === 0
    ) {
      //show alert for invalid input
      alert('Invalid input please try again!!!!');
    } else {
      //return tuple if input is valid
      return [titleInput, descriptionInput, +peopleInput];
    }
  }

  private configure() {
    //handle submit event of form
    this.element.addEventListener('submit', this.submitHandler);
  }
}
const prjInput = new ProjectInput();
