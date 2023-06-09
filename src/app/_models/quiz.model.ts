import { Question } from "./question.model";
import { Result } from "./result.model";

export class Quiz {
    id: number | undefined;
    pin: string | undefined;
    title: string | undefined;
    questions: Question[] | undefined;
    userId: string | undefined;
    //results: Result[] | undefined;
}
