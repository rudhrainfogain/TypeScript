//Project Status
export var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus[ProjectStatus["Active"] = 0] = "Active";
    ProjectStatus[ProjectStatus["Finished"] = 1] = "Finished";
})(ProjectStatus || (ProjectStatus = {}));
//Project
export class Project {
    constructor(projectId, title, description, numOfPeople, status) {
        this.projectId = projectId;
        this.title = title;
        this.description = description;
        this.numOfPeople = numOfPeople;
        this.status = status;
    }
}
//# sourceMappingURL=project.js.map