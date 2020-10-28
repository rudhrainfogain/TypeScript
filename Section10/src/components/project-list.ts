/// <reference path ="base-component.ts" />
/// <reference path ="../decorators/autobind.ts" />
/// <reference path ="../state/project-state.ts" />
/// <reference path ="../models/drag-drop.ts" />
/// <reference path ="../models/project.ts" />

namespace App {
  //Project List class
  export class ProjectList
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
}
