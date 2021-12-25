import { StudySession } from "./study-session";
import { Subject } from "./subject";

export class Topic {
    id: number = 0;
    name: string;
    sessions: StudySession[] = [];
    totalRightAnswers: number = 0;
    totalWrongAnswers: number = 0;
    totalTime: string = '';
    totalSessions: number = 0;
    subject?: Subject;

    constructor(name: string) {
        this.name = name;
    }
}
