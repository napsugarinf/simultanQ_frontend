import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { PassDataService } from 'src/app/_services/pass-data.service';

@Component({
  selector: 'app-quiz-leaderboard',
  templateUrl: './quiz-leaderboard.component.html',
  styleUrls: ['./quiz-leaderboard.component.css']
})
export class QuizLeaderboardComponent implements OnInit{
  participants: any;
  receivedPin: string = '';
  private stompClient: any;

  constructor(private passDataService: PassDataService) { }

  ngOnInit() {
    this.receivedPin = this.passDataService.myDataPlayQuizPin || '';
    console.log('this received pin:', this.receivedPin);
    this.connect();
  }

  connect() {
    const quizPin = this.receivedPin; // Provide the quiz pin for which you want to fetch participants' data
    const socket = new SockJS(`http://localhost:9001/quiz`);
    this.stompClient = Stomp.over(socket);
    const _this = this;
    this.stompClient.connect({}, function (frame: string) {
      console.log('Connected: ' + frame);
      _this.stompClient.subscribe(`/quiz/${quizPin}`, (result: { body: any; }) => {
        const participants = JSON.parse(result.body);
        _this.updateParticipants(participants);
         
        // try {
        //   const part = JSON.parse(message);
        //   console.log('participants', part);
         
        
        // } catch (error) {
        //   console.log('Message:', message);
        // }
      //   console.log(result.body);
      //   const participants = JSON.parse(result.body);
      //   console.log('Participants:', participants);
      //   _this.participants = participants;
      // });
   
    });
    _this.listPlayers();
  }
    );}



    listPlayers() {
      this.stompClient.send(`/game/sendparticipants/${this.receivedPin}`, {}, this.receivedPin); 
    }

    updateParticipants(participants: any) {
      // Update the participants variable with the received data
      this.participants = participants;
    }
}
