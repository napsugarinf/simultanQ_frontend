import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Question } from 'src/app/_models/question.model';
import { Quiz } from 'src/app/_models/quiz.model';
import { Result } from 'src/app/_models/result.model';
import { PlayquizService } from 'src/app/_services/playquiz.service';
import { QuestionComponent } from '../question/question.component';
import { PassDataService } from 'src/app/_services/pass-data.service';
import { PlayerAnswer } from 'src/app/_models/player-answer.model';
import { Answer } from 'src/app/_models/answer.model';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
  
})
export class PlayComponent implements OnInit  {


  constructor(private playQuizService: PlayquizService, public passDataService: PassDataService,
    private router: Router){ }
 
  quiz? : Quiz;
  name? : string;

  ngOnInit(): void {
  
  }
  startQuiz(pin: string, name: string) {
    this.playQuizService.getByPIN2(pin).subscribe(
      (quiz: Quiz) => {
        // Quiz found
        this.quiz = quiz;
        this.passDataService.myDataQuiz = this.quiz;
        this.passDataService.myDataName = name;
        this.passDataService.myDataPIN = pin;
        this.router.navigate(['/getquestion']);
      },
      (error: any) => {
        // Quiz not found
        console.log("Error:", error);
        alert("Quiz with PIN " + pin + " does not exist.");
        // You can customize the alert message or use a different UI component to display the message
        
      }
    );
  }
  
  }



