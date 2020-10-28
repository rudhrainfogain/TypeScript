/// <reference path ="base-component.ts" />
/// <reference path ="../decorators/autobind.ts" />
/// <reference path ="../models/project.ts" />
/// <reference path ="../models/drag-drop.ts" />

namespace App {
  //ProjectItem class to add a item to list
  export class ProjectItem
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
      this.element.querySelector('h3')!.textContent =
        this.persons + ' assigned';
      this.element.querySelector('p')!.textContent = this.project.description;
    }
  }
}
