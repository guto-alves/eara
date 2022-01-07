import { Project } from "./project";
import { Topic } from "./topic";

export class Subject {
    id: number = 0;
    name: string = '';
    topics: Topic[] = [];
    project: Project = new Project();

    constructor(name: string = '') {
        this.name = name;
    }
}