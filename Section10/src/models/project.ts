namespace App {
  //Project Status
  export enum ProjectStatus {
    Active,
    Finished
  }
  //Project
  export class Project {
    constructor(
      public projectId: string,
      public title: string,
      public description: string,
      public numOfPeople: number,
      public status: ProjectStatus
    ) {}
  }
}
