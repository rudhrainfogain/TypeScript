//Project Status
enum ProjectStatus {
  Active,
  Finished
}
//Project
class Project {
  constructor(
    public projectId: string,
    public title: string,
    public description: string,
    public numOfPeople: number,
    public status: ProjectStatus
  ) {}
}
//Type for listeners
type Listener = (items: Project[]) => void;
//Project State Management
class ProjectState {
  //field to store projects
  private projects: Project[] = [];
  //field for listeners
  private listeners: Listener[] = [];
  //private instance
  private static instance: ProjectState;
  //private constructor so that class cant be instantiated from outside
  private constructor() {}
  //static method to get instance of this class
  static getInstance() {
    if (this.instance) {
      return this.instance;
    } else {
      this.instance = new ProjectState();
      return this.instance;
    }
  }

  //public method to addProjects to above array
  addProject(title: string, description: string, numOfPeople: number) {
    //create a new project
    const newProject = new Project(
      Math.random().toString(),
      title,
      description,
      numOfPeople,
      ProjectStatus.Active
    );
    //add this project to projects array
    this.projects.push(newProject);
    //call all listener functions whenever a new project is added
    for (const listenerFn of this.listeners) {
      //call listener function passing the copy of projects array
      listenerFn(this.projects.slice());
    }
  }
  // method to register a new listener
  addListener(listener: Listener) {
    //add the listener to listeners array
    this.listeners.push(listener);
  }
}
//Global constant representing the application state
const projectState = ProjectState.getInstance();
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
//Validatable Interface
interface Validatable {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

//validate function
function validate(validatebleInput: Validatable) {
  let isValid = true;
  //required validation
  if (validatebleInput.required) {
    isValid = isValid && validatebleInput.value.toString().trim().length !== 0;
  }
  //validations for string
  if (typeof validatebleInput.value === 'string') {
    //min length validation
    if (validatebleInput.minLength != null) {
      isValid =
        isValid && validatebleInput.value.length >= validatebleInput.minLength;
    }
    //max length validation
    if (validatebleInput.maxLength != null) {
      isValid =
        isValid && validatebleInput.value.length <= validatebleInput.maxLength;
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
//Project List class
class ProjectList {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLElement;
  assignedProjects: Project[];
  constructor(private type: 'active' | 'finished') {
    //get access to template and div
    this.templateElement = document.getElementById(
      'project-list'
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById('app')! as HTMLDivElement;

    //import content from template
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    //access the section
    this.element = importedNode.firstElementChild as HTMLElement;
    //Add style to form dynamically based on the type of project
    this.element.id = `${this.type}-projects`;
    //set assigned projects to an empty array
    this.assignedProjects = [];
    //add a listener to project state
    projectState.addListener((projects: Project[]) => {
      //save projects array copy to assignedProjects
      this.assignedProjects = projects;
      //call method to render all projects to list
      this.renderProjects();
    });
    //add element to dom
    this.attach();

    //render data
    this.renderContent();
  }
  //method to render projects to list
  private renderProjects() {
    //fetch the list
    const listElement = document.getElementById(
      `${this.type}-projects-list`
    )! as HTMLUListElement;
    //loop through all the projects
    for (const project of this.assignedProjects) {
      //create a new list item
      const listItem = document.createElement('li');
      //set text of list item to project title
      listItem.textContent = project.title;
      //add list item to the list
      listElement.appendChild(listItem);
    }
  }
  private renderContent() {
    //Create id for ul dynamically based on the type of project
    const listId = `${this.type}-projects-list`;
    //fetch the ul tag and add this id to it
    this.element.querySelector('ul')!.id = listId;
    //fetch the h2 tag and set its value dynamically based on the type of project
    this.element.querySelector('h2')!.textContent =
      this.type.toUpperCase() + ' PROJECTS';
  }
  private attach() {
    //add element to div
    this.hostElement.insertAdjacentElement('beforeend', this.element);
  }
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
    const validatableTitle: Validatable = {
      value: titleInput,
      required: true
    };
    const validatableDescription: Validatable = {
      value: descriptionInput,
      required: true,
      minLength: 5
    };
    const validatablePeople: Validatable = {
      value: +peopleInput,
      required: true,
      min: 1,
      max: 5
    };
    //validate the input by calling validate function
    if (
      !validate(validatableTitle) ||
      !validate(validatableDescription) ||
      !validate(validatablePeople)
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
const activeProjectsList = new ProjectList('active');
const finishedProjectsList = new ProjectList('finished');
