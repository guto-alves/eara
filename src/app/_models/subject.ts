import { Project } from "./project";
import { Topic } from "./topic";

export class Subject {
    id: number = 0;
    name: string = '';
    topics: Topic[] = [];
    project: Project = new Project();

    constructor(name: string) {
        this.name = name;
    }

    getNameId(): string {
        //return this.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        return this.name.replace(/\//g, "_"); // "1399_06_08"
    }
}