import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Answer } from 'src/app/_models/answer.model';
import { Question } from 'src/app/_models/question.model';
import { Quiz } from 'src/app/_models/quiz.model';
import { UserIdServiceService } from 'src/app/_services/user-id-service.service';

const baseUrl = 'http://localhost:9001/api/quizzes';
@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.css']
})
export class CreateQuizComponent {
quiz = new Quiz();
nrOfQuestions? : number;

  constructor(private http: HttpClient, private userIdService: UserIdServiceService, private router: Router) {}
  

  createGrid() {
    // Create an array of empty questions based on the selected number of questions
    this.quiz.questions = Array(this.nrOfQuestions)
      .fill(null)
      .map(() => new Question());
  }

  addAnswer(question: Question) {
    question.answers = question.answers || [];
    question.answers.push(new Answer());
  }

  // removeAnswer(question: Question, index: number) {
  //   question.answers.splice(index, 1);
  // }

  addQuiz() {
    // Send the quiz object to the backend API for saving
    console.log(this.userIdService.myDataUserId);
    this.quiz.userId = this.userIdService.myDataUserId;
    console.log(this.quiz);
    this.http.post(`${baseUrl}/addQuiz`, this.quiz, ).subscribe((resultData: any) => {
      console.log(resultData);
      alert("quiz added successfully");
    });
    this.router.navigate(['create/hostdashboard/listQuizzes']);
  }
}