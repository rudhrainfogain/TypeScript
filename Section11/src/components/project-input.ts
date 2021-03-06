import { Component } from './base-component';
import { autobind as Autobind } from '../decorators/autobind';
import { projectState } from '../state/project-state';
import * as Validation from '../util/validation';
//Project Input class
export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;
  constructor() {
    super('project-input', 'app', 'afterbegin', 'user-input');

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
  }
  renderContent() {}
  @Autobind
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
      //add project to global state
      projectState.addProject(title, description, people);
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

    //Create validatabale objects for user inputs
    const validatableTitle: Validation.Validatable = {
      value: titleInput,
      required: true
    };
    const validatableDescription: Validation.Validatable = {
      value: descriptionInput,
      required: true,
      minLength: 5
    };
    const validatablePeople: Validation.Validatable = {
      value: +peopleInput,
      required: true,
      min: 1,
      max: 5
    };
    //validate the input by calling validate function
    if (
      !Validation.validate(validatableTitle) ||
      !Validation.validate(validatableDescription) ||
      !Validation.validate(validatablePeople)
    ) {
      //show alert for invalid input
      alert('Invalid input please try again!!!!');
    } else {
      //return tuple if input is valid
      return [titleInput, descriptionInput, +peopleInput];
    }
  }

  configure() {
    //handle submit event of form
    this.element.addEventListener('submit', this.submitHandler);
  }
}
