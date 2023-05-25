import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Question } from 'src/app/_models/question.model';
import { Quiz } from 'src/app/_models/quiz.model';
import { Result } from 'src/app/_models/result.model';
import { PlayquizService } from 'src/app/_services/playquiz.service';
import { QuestionComponent } from '../question/question.component';
import { PassDataService } from 'src/app/_services/pass-data.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
  
})
export class PlayComponent implements OnInit  {

  //@Output() myData = new EventEmitter<Quiz>();

  constructor(private playQuizService: PlayquizService, public passDataService: PassDataService,
    private router: Router){ }
 
  integerUnsigned: string = '^[0-9]*$';
  quizPIN = '';
  text: Object | undefined;
  quiz? : Quiz;
  name? : string;

  ngOnInit(): void {
    
    
  }
  startQuiz(pin: string, name: string){
    this.quizPIN=pin;
    this.name=name;
    this.load();    
    this.router.navigate(['/question'])

  }
  
  load(){
this.playQuizService.getByPIN2(this.quizPIN).subscribe((response: any) => {
  //console.log(response);
  this.quiz = response;
  this.passDataService.myDataQuiz=this.quiz;
  this.passDataService.myDataName=this.name;
});

    }
  }


