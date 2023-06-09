import { Injectable } from '@angular/core';
import { Quiz } from '../_models/quiz.model';

@Injectable({
  providedIn: 'root'
})
export class PassDataService {
  public myDataQuiz?: Quiz ;
  public myDataName?: string ;
  public myDataPIN?: string;
  public myDataPlayQuizPin? : string;
  public isQuizActive?: boolean = false;
  constructor() { }
}
