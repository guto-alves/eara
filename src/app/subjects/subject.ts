import { Topic } from "../topics/topic";

export class Subject {
    id: number = 0;
    name: string = '';
    topics: Topic[] = [];

    constructor(name: string) {
        this.name = name;
    }

    getNameId() : string {
        //return this.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        return this.name.replace(/\//g, "_"); // "1399_06_08"
    }
}