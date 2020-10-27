//Drag and Drop
interface Draggable {
  dragStartHandler(event: DragEvent): void;
  dragEndHandler(event: DragEvent): void;
}

interface DragTarget {
  dragOverHandler(event: DragEvent): void;
  dropHandler(event: DragEvent): void;
  dragLeaveHandler(event: DragEvent): void;
}
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
type Listener<T> = (items: T[]) => void;
//Base state class
abstract class State<T> {
  //field for listeners
  protected listeners: Listener<T>[] = [];
  // method to register a new listener
  addListener(listener: Listener<T>) {
    //add the listener to listeners array
    this.listeners.push(listener);
  }
}
//Project State Management
class ProjectState extends State<Project> {
  //field to store projects
  private projects: Project[] = [];

  //private instance
  private static instance: ProjectState;
  //private constructor so that class cant be instantiated from outside
  private constructor() {
    super();
  }
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
    this.updateListeners();
  }

  moveProject(projectId: string, newStatus: ProjectStatus) {
    //find the project based on project id
    const project = this.projects.find(prj => prj.projectId === projectId);
    //move only if project status is changed
    if (project && project.status !== newStatus) {
      //if project is found change its status to one supplied
      project.status = newStatus;
      //call all listener functions whenever a project is moved
      this.updateListeners();
    }
  }

  private updateListeners() {
    for (const listenerFn of this.listeners) {
      //call listener function passing the copy of projects array
      listenerFn(this.projects.slice());
    }
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
//Component base calss
abstract class Component<T extends HTMLElement, U extends HTMLElement> {
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
//ProjectItem class to add a item to list
class ProjectItem
  extends Component<HTMLUListElement, HTMLLIElement>
  implements Draggable {
  //Field to hold the project to render
  private project: Project;
  get persons() {
    if (this.project.numOfPeople === 1) {
      return '1 person';
    } else {
      return `${this.project.numOfPeople} persons`;
    }
  }
  //Constructor
  constructor(hostId: string, project: Project) {
    super('single-project', hostId, 'beforeend', project.projectId);
    this.project = project;
    //call configure method
    this.configure();
    //call rendercontent method
    this.renderContent();
  }
  @autobind
  dragStartHandler(event: DragEvent): void {
    //set data to be transfered
    event.dataTransfer!.setData('text/plain', this.project.projectId);
    //set the allowed effect to move to signify the intent of moving the item for cursor changes on ui
    event.dataTransfer!.effectAllowed = 'move';
  }
  dragEndHandler(event: DragEvent): void {
    console.log('drag end', event);
  }
  configure(): void {
    //add event listener to listen to dragstart event
    this.element.addEventListener('dragstart', this.dragStartHandler);
  }
  renderContent(): void {
    //select elements and set project details
    this.element.querySelector('h2')!.textContent = this.project.title;
    this.element.querySelector('h3')!.textContent = this.persons + ' assigned';
    this.element.querySelector('p')!.textContent = this.project.description;
  }
}
//Project List class
class ProjectList
  extends Component<HTMLDivElement, HTMLElement>
  implements DragTarget {
  assignedProjects: Project[];
  constructor(private type: 'active' | 'finished') {
    super('project-list', 'app', 'beforeend', `${type}-projects`);
    //set assigned projects to an empty array
    this.assignedProjects = [];
    //add a listener to project state
    this.configure();
    //render data
    this.renderContent();
  }
  @autobind
  dragOverHandler(event: DragEvent): void {
    //check if we need to allow the drop
    if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
      //allow the drop
      event.preventDefault();
      //Fetch the ul element
      const listEl = this.element.querySelector('ul')!;
      //add droppable class to change ui on drag over
      listEl.classList.add('droppable');
    }
  }
  @autobind
  dropHandler(event: DragEvent): void {
    const projectId = event.dataTransfer!.getData('text/plain');
    projectState.moveProject(
      projectId,
      this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished
    );
    //Fetch the ul element
    const listEl = this.element.querySelector('ul')!;
    //remove the droppable class to revert ui changes after drop end
    listEl.classList.remove('droppable');
  }
  @autobind
  dragLeaveHandler(event: DragEvent): void {
    console.log('dragLeave', event);
    //Fetch the ul element
    const listEl = this.element.querySelector('ul')!;
    //remove the droppable class to revert ui changes on drag leave
    listEl.classList.remove('droppable');
  }
  //add listener logic now resides in configure
  configure() {
    //add listeners for drag drop events
    this.element.addEventListener('dragover', this.dragOverHandler);
    this.element.addEventListener('drop', this.dropHandler);
    this.element.addEventListener('dragleave', this.dragLeaveHandler);
    //add a listener to project state
    projectState.addListener((projects: Project[]) => {
      //filter the projects list based on status
      const relevantProjects = projects.filter(prj => {
        if (this.type === 'active') {
          return prj.status === ProjectStatus.Active;
        }
        return prj.status === ProjectStatus.Finished;
      });
      //save relevant array to assignedProjects
      this.assignedProjects = relevantProjects;
      //call method to render all projects to list
      this.renderProjects();
    });
  }
  //method to render projects to list
  private renderProjects() {
    //fetch the list
    const listElement = document.getElementById(
      `${this.type}-projects-list`
    )! as HTMLUListElement;
    //clear already rendered items
    listElement.innerHTML = '';
    //loop through all the projects
    for (const project of this.assignedProjects) {
      //instantiate new ProjectItem to render to list
      new ProjectItem(this.element.querySelector('ul')!.id, project);
    }
  }
  renderContent() {
    //Create id for ul dynamically based on the type of project
    const listId = `${this.type}-projects-list`;
    //fetch the ul tag and add this id to it
    this.element.querySelector('ul')!.id = listId;
    //fetch the h2 tag and set its value dynamically based on the type of project
    this.element.querySelector('h2')!.textContent =
      this.type.toUpperCase() + ' PROJECTS';
  }
}
//Project Input class
class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
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

  configure() {
    //handle submit event of form
    this.element.addEventListener('submit', this.submitHandler);
  }
}
const prjInput = new ProjectInput();
const activeProjectsList = new ProjectList('active');
const finishedProjectsList = new ProjectList('finished');
