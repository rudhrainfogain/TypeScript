var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { autobind } from '../decorators/autobind.js';
import { ProjectStatus } from '../models/project.js';
import { projectState } from '../state/project-state.js';
import { Component } from './base-component.js';
import { ProjectItem } from './project-item.js';
//Project List class
export class ProjectList extends Component {
    constructor(type) {
        super('project-list', 'app', 'beforeend', `${type}-projects`);
        this.type = type;
        //set assigned projects to an empty array
        this.assignedProjects = [];
        //add a listener to project state
        this.configure();
        //render data
        this.renderContent();
    }
    dragOverHandler(event) {
        //check if we need to allow the drop
        if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
            //allow the drop
            event.preventDefault();
            //Fetch the ul element
            const listEl = this.element.querySelector('ul');
            //add droppable class to change ui on drag over
            listEl.classList.add('droppable');
        }
    }
    dropHandler(event) {
        const projectId = event.dataTransfer.getData('text/plain');
        projectState.moveProject(projectId, this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished);
        //Fetch the ul element
        const listEl = this.element.querySelector('ul');
        //remove the droppable class to revert ui changes after drop end
        listEl.classList.remove('droppable');
    }
    dragLeaveHandler(event) {
        //Fetch the ul element
        const listEl = this.element.querySelector('ul');
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
        projectState.addListener((projects) => {
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
    renderProjects() {
        //fetch the list
        const listElement = document.getElementById(`${this.type}-projects-list`);
        //clear already rendered items
        listElement.innerHTML = '';
        //loop through all the projects
        for (const project of this.assignedProjects) {
            //instantiate new ProjectItem to render to list
            new ProjectItem(this.element.querySelector('ul').id, project);
        }
    }
    renderContent() {
        //Create id for ul dynamically based on the type of project
        const listId = `${this.type}-projects-list`;
        //fetch the ul tag and add this id to it
        this.element.querySelector('ul').id = listId;
        //fetch the h2 tag and set its value dynamically based on the type of project
        this.element.querySelector('h2').textContent =
            this.type.toUpperCase() + ' PROJECTS';
    }
}
__decorate([
    autobind
], ProjectList.prototype, "dragOverHandler", null);
__decorate([
    autobind
], ProjectList.prototype, "dropHandler", null);
__decorate([
    autobind
], ProjectList.prototype, "dragLeaveHandler", null);
//# sourceMappingURL=project-list.js.map