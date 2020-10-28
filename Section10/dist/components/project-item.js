var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { autobind } from '../decorators/autobind.js';
import { Component } from './base-component.js';
//ProjectItem class to add a item to list
export class ProjectItem extends Component {
    //Constructor
    constructor(hostId, project) {
        super('single-project', hostId, 'beforeend', project.projectId);
        this.project = project;
        //call configure method
        this.configure();
        //call rendercontent method
        this.renderContent();
    }
    get persons() {
        if (this.project.numOfPeople === 1) {
            return '1 person';
        }
        else {
            return `${this.project.numOfPeople} persons`;
        }
    }
    dragStartHandler(event) {
        //set data to be transfered
        event.dataTransfer.setData('text/plain', this.project.projectId);
        //set the allowed effect to move to signify the intent of moving the item for cursor changes on ui
        event.dataTransfer.effectAllowed = 'move';
    }
    dragEndHandler(event) {
        console.log('drag end', event);
    }
    configure() {
        //add event listener to listen to dragstart event
        this.element.addEventListener('dragstart', this.dragStartHandler);
    }
    renderContent() {
        //select elements and set project details
        this.element.querySelector('h2').textContent = this.project.title;
        this.element.querySelector('h3').textContent = this.persons + ' assigned';
        this.element.querySelector('p').textContent = this.project.description;
    }
}
__decorate([
    autobind
], ProjectItem.prototype, "dragStartHandler", null);
//# sourceMappingURL=project-item.js.map