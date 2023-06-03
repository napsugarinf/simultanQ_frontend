import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

@Component({
  selector: 'app-quiz-leaderboard',
  templateUrl: './quiz-leaderboard.component.html',
  styleUrls: ['./quiz-leaderboard.component.css']
})
export class QuizLeaderboardComponent implements OnInit{
  participants: any;

  private stompClient: any;

  constructor() { }

  ngOnInit() {
    this.connect();
  }

  connect() {
    const quizPin = "737704"; // Provide the quiz pin for which you want to fetch participants' data
    const socket = new SockJS(`http://localhost:9001/quiz`);
    this.stompClient = Stomp.over(socket);
    const _this = this;
    this.stompClient.connect({}, function (frame: string) {
      console.log('Connected: ' + frame);
      _this.stompClient.subscribe(`/quiz`, (result: { body: any; }) => {
        const message = result.body;
        try {
          const part = JSON.parse(message);
          console.log('participants', part);
        
        } catch (error) {
          console.log('Message:', message);
        }
      //   console.log(result.body);
      //   const participants = JSON.parse(result.body);
      //   console.log('Participants:', participants);
      //   _this.participants = participants;
      // });
     
    });
  }
    );}


}
