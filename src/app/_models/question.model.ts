import { Answer } from "./answer.model";

export class Question {

  id: number | undefined;
  text: string | undefined;
  answers: Answer[] | undefined;
}
