import { Topic } from "./topic";

export class StudySession {
    id: number = 0;
    creationDate: string = '';
    totalTime: string = '';
    rightAnswers = 0;
    wrongAnswers = 0;
    obs?: string;
    topic: Topic = new Topic('');
}
