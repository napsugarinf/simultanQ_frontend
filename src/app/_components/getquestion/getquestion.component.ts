import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PassDataService } from 'src/app/_services/pass-data.service';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { Quiz } from 'src/app/_models/quiz.model';
import { Question } from 'src/app/_models/question.model';
import { Answer } from 'src/app/_models/answer.model';
import { v4 as uuidv4 } from 'uuid';
import { Router } from '@angular/router';

@Component({
  selector: 'app-getquestion',
  templateUrl: './getquestion.component.html',
  styleUrls: ['./getquestion.component.css']
})
export class GetquestionComponent implements OnInit {
  receivedPin: string = '';
  //quiz? :Quiz;
  question?:Question;
  playeranswer?: Answer;
  selectedAnswerId? : number | undefined;
  quizCompleted: boolean = false;
  connectionIsAlive: boolean = false;
  playerId: string = '';
  sessionId: string='';
  private stompClient: any;
  connectionStatus: string = '';


  constructor(public passDataService: PassDataService, private http: HttpClient, private router:Router) { }

  ngOnInit() {
    this.receivedPin = this.passDataService.myDataPIN || '';
    const randomNumber = this.generateRandomNumber();
    this.playerId = (this.passDataService.myDataName ||'')+'_'+randomNumber.toString();
    //console.log(this.receivedPin);
      this.connect();
    //this.showQuiz();
  }



  connect() {
    this.sessionId = uuidv4();
    const socket = new SockJS(`http://localhost:9001/quiz`);
    this.stompClient = Stomp.over(socket);
    const _this = this;
    this.stompClient.connect({}, function (frame: string) {
      //console.log('Connected: ' + frame);
      _this.connectionStatus = 'Connected';
      _this.connectionIsAlive = true;
      _this.stompClient.subscribe(`/quiz/${_this.receivedPin}/${_this.playerId}`, (result: { body: any; }) => {
        const message = result.body;
        try {
          const question = JSON.parse(message);
          //console.log('Question:', question);
          _this.handleQuestion(question);
        } catch (error) {
          //console.log('Message:', message);
          _this.handleMessage(message);
        }
      }, function (error: any) {
        console.log('Error: ' + error);
        _this.connectionStatus = 'Disconnected';
      });
      _this.startQuiz();
    });
  }
  
  handleQuestion(question: any) {
    if (!this.isWebSocketConnected()) {
      console.log('WebSocket connection lost.');
      this.connectionIsAlive=false;
      return;
    }
    if (question && question.hasOwnProperty('id')) {
      this.question = question;
      // Display the question on the frontend and handle user response
      this.selectedAnswerId = undefined;
    }
  }
  
  handleMessage(message: any) {
    if (!this.isWebSocketConnected()) {
      console.log('WebSocket connection lost.');
      this.connectionIsAlive=false;
      return;
    }
    if (message === "Quiz completed") {
      this.quizCompleted = true;
      //console.log("Quiz completed");
    }
  }
 
  startQuiz() {
    this.stompClient.send(`/game/startQuiz/${this.receivedPin}/${this.playerId}`, {'playerId' : this.playerId}, this.receivedPin); 
  }
  selectAnswer(answerId?: number) {
    this.selectedAnswerId=answerId;
  }
  submitAnswer() {
    if (this.selectedAnswerId) {
      const userResponse = this.selectedAnswerId.toString(); 
      // Send the user's response to the server
      this.stompClient.send(`/game/submitResponse/${this.receivedPin}/${this.question?.id}/${this.playerId}`, {'playerId': this.playerId}, userResponse);
    } else {
      // No answer selected, handle accordingly (e.g., show an error message)
    }
  }
  generateRandomNumber(): number {
    return Math.floor(Math.random() * 900) + 100;
  }
  isWebSocketConnected(): boolean {
    return this.stompClient && this.stompClient.connected;
  }

  tryAgain(){
    this.router.navigate(['/play'])
  }
  // getMyScore(){
  //     const quizPin = this.receivedPin; // Provide the quiz pin for which you want to fetch participants' data
  //     const socket = new SockJS(`http://localhost:9001/quiz`);
  //     this.stompClient = Stomp.over(socket);
  //     const _this = this;
  //     this.stompClient.connect({}, function (frame: string) {
  //       console.log('Connected: ' + frame);
  //       _this.stompClient.subscribe(`/quiz/${quizPin}`, (result: { body: any; }) => {
           
  //          try {
  //         const participants = JSON.parse(result.body);
  //         console.log(participants);
  //          } catch (error) {
  //            console.log('Message:', result.body);
  
  //          }
         
  //     });
  //   }
  //     );}
  
}

