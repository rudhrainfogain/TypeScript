import { Project, ProjectStatus } from '../models/project.js';
//Base state class
class State {
    constructor() {
        //field for listeners
        this.listeners = [];
    }
    // method to register a new listener
    addListener(listener) {
        //add the listener to listeners array
        this.listeners.push(listener);
    }
}
//Project State Management
export class ProjectState extends State {
    //private constructor so that class cant be instantiated from outside
    constructor() {
        super();
        //field to store projects
        this.projects = [];
    }
    //static method to get instance of this class
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        else {
            this.instance = new ProjectState();
            return this.instance;
        }
    }
    //public method to addProjects to above array
    addProject(title, description, numOfPeople) {
        //create a new project
        const newProject = new Project(Math.random().toString(), title, description, numOfPeople, ProjectStatus.Active);
        //add this project to projects array
        this.projects.push(newProject);
        //call all listener functions whenever a new project is added
        this.updateListeners();
    }
    moveProject(projectId, newStatus) {
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
    updateListeners() {
        for (const listenerFn of this.listeners) {
            //call listener function passing the copy of projects array
            listenerFn(this.projects.slice());
        }
    }
}
console.log('Project State Created');
//Global constant representing the application state
export const projectState = ProjectState.getInstance();
//# sourceMappingURL=project-state.js.map