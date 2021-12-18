import { StudySession } from "./study-session";

export class Topic {
    id: number = 0;
    name: string;
    sessions: StudySession[] = [];
    totalRightAnswers: number = 0;
    totalWrongAnswers: number = 0;
    totalTime: string = '';
    totalSessions: number = 0;

    constructor(name: string) {
        this.name = name;
    }
}
