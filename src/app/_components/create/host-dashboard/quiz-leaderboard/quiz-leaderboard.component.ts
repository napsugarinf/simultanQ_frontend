import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { PassDataService } from 'src/app/_services/pass-data.service';

@Component({
  selector: 'app-quiz-leaderboard',
  templateUrl: './quiz-leaderboard.component.html',
  styleUrls: ['./quiz-leaderboard.component.css']
})
export class QuizLeaderboardComponent implements OnInit{
  //participants: any;
  participants: Record<string, number> | undefined;
  receivedPin: string = '';
  private stompClient: any;
  participantsJoined: boolean=false;

  constructor(private passDataService: PassDataService,  private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.receivedPin = this.passDataService.myDataPlayQuizPin || '';
    console.log('this received pin:', this.receivedPin);
   
  }



  connect() {
    const quizPin = this.receivedPin; // Provide the quiz pin for which you want to fetch participants' data
    const socket = new SockJS(`http://localhost:9001/quiz`);
    this.stompClient = Stomp.over(socket);
    const _this = this;
    this.stompClient.connect({}, function (frame: string) {
      console.log('Connected: ' + frame);
      _this.stompClient.subscribe(`/quiz/${quizPin}`, (result: { body: any; }) => {
        // const participants = JSON.parse(result.body);
        // _this.updateParticipants(participants);
         
         try {
        const participants = JSON.parse(result.body);
        _this.participantsJoined=true;
        _this.updateParticipants(participants);
        
         } catch (error) {
           console.log('Message:', result.body);

         }
       
    });
    _this.listPlayers();
  }
    );}



    listPlayers() {
      this.stompClient.send(`/game/sendparticipants/${this.receivedPin}`, {}, this.receivedPin); 
    }

    updateParticipants(participants: Record<string, number>) {
      // Update the participants variable with the received data
      const participantArray = Object.entries(participants);
      participantArray.sort((a, b) => b[1] - a[1]);
      const sortedParticipants: any = {};

      participantArray.forEach(([key, value]) => {
        sortedParticipants[key] = value;
      });
    this.participants = sortedParticipants;
    this.changeDetectorRef.detectChanges();
    }
    disconnect(){
      this.stompClient.send(`/game/endQuiz/${this.receivedPin}`, {}, this.receivedPin); 
      this.stompClient.disconnect();

    }
    startQuiz(){
      this.participants=undefined;
      this.passDataService.isQuizActive=true;
      console.log(this.passDataService.isQuizActive);
      this.connect();
    }
    endQuiz(){
      this.disconnect();
      this.participants=undefined;
        }
}
