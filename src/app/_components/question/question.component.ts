import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { PlayComponent } from '../play/play.component';
import { PassDataService } from 'src/app/_services/pass-data.service';
import { interval } from 'rxjs';
import { Quiz } from 'src/app/_models/quiz.model';
import { PlayerAnswer } from 'src/app/_models/player-answer.model';
import { Question } from 'src/app/_models/question.model';
import { Answer } from 'src/app/_models/answer.model';
import { HttpClient, HttpEvent } from '@angular/common/http';

const baseUrl = 'http://localhost:9001/api/quizzes';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})


export class QuestionComponent {
  public quiz: Quiz| undefined;
  public name?: string;
  public questionList: any=[];
  public currentQuestion: number = 0;
  public points: number = 0;
  counter = 60;
  correctAnswer: number = 0;
  public inCorrectAnswer: number = 0;
  interval$: any;
  progress: string = "0";
  isQuizCompleted : boolean = false;
  public selectedAnswerIndex: number = -1;


  userAnswers: PlayerAnswer[] = [];  // Array to store the user's selected answers

  constructor(public passDataService: PassDataService, private http : HttpClient){}

  ngOnInit(): void {
    this.quiz=this.passDataService.myDataQuiz;
  this.questionList= this.passDataService.myDataQuiz?.questions;
  this.name=this.passDataService.myDataName;
  }



startQuiz(){
  this.quiz=this.passDataService.myDataQuiz;
  this.questionList= this.passDataService.myDataQuiz?.questions;
  this.name=this.passDataService.myDataName;
  console.log(this.passDataService.myDataQuiz);
}

// getAllQuestions() {
//   this.questionList= this.passDataService.myDataQuiz?.questions;
// }


// nextQuestion() {
//   this.currentQuestion++;
// }
// previousQuestion() {
//   this.currentQuestion--;
// }
// answer(currentQno: number, option: any) {
//   if (option.correct) {
//     this.points += 10;
//     this.correctAnswer++;
//   } else {
//     this.inCorrectAnswer--;
//     this.points -= 10;
//   }

//   this.selectedAnswerIndex = this.questionList[currentQno].answers.indexOf(option);

//   if (this.currentQuestion === this.questionList.length - 1) {
//     // Last question has been answered
//     this.isQuizCompleted = true;
//     this.stopCounter();
//   } else {
//     setTimeout(() => {
//       this.currentQuestion++;
//       this.resetCounter();
//       this.getProgressPercent();
//     }, 1000);
//   }
// }

// startCounter() {
//   this.interval$ = interval(1000)
//     .subscribe(val => {
//       this.counter--;
//       if (this.counter === 0) {
//         this.currentQuestion++;
//         this.counter = 60;
//         this.points -= 10;
//       }
//     });
//   setTimeout(() => {
//     this.interval$.unsubscribe();
//   }, 600000);
// }
// stopCounter() {
//   this.interval$.unsubscribe();
//   this.counter = 0;
// }
// resetCounter() {
//   this.stopCounter();
//   this.counter = 60;
//   this.startCounter();
// }
// resetQuiz() {
//   this.resetCounter();
//   this.getAllQuestions();
//   this.points = 0;
//   this.counter = 60;
//   this.currentQuestion = 0;
//   this.progress = "0";

// }
// getProgressPercent() {
//   this.progress = ((this.currentQuestion / this.questionList.length) * 100).toString();
//   return this.progress;

// }




// Method to handle submitting the answers
submitAnswers() {
  const pin = '9876';
  const url = `http://localhost:9001/api/quizzes/${pin}/submitAnswers`; // Update the URL as per your API endpoint
  // Call the API endpoint to submit the answers and handle the response
  let bodyData = {
    // "username" : this.username,
    // "password" : this.password,
    // "email" : this.email    
  }
  console.log(bodyData);
  this.http.post(url, this.userAnswers).subscribe((resultData: any) => {
    console.log(resultData);
    alert("Answer added");
  });
  console.log(this.userAnswers);
  // Rest of the code to handle submitting the answers
}

// Method to handle selecting an answer
selectAnswer(question: Question, answer: Answer) {
  // Check if the user has already selected an answer for the question
  const existingUserAnswer = this.userAnswers.find(userAnswer => userAnswer.questionId === question.id);

  if (existingUserAnswer) {
    // Update the existing user answer
    existingUserAnswer.answerId = answer.id;
  } else {
    // Create a new user answer
    const userAnswer: PlayerAnswer = {
      questionId: question.id,
      answerId: answer.id
    };
    this.userAnswers.push(userAnswer);
  }
}
}
