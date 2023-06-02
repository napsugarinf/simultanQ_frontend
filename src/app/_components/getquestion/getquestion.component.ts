// import { HttpClient } from '@angular/common/http';
// import { Component, OnInit } from '@angular/core';
// import { PassDataService } from 'src/app/_services/pass-data.service';
// import * as Stomp from 'stompjs';
// import * as SockJS from 'sockjs-client';


// @Component({
//   selector: 'app-getquestion',
//   templateUrl: './getquestion.component.html',
//   styleUrls: ['./getquestion.component.css']
// })
// export class GetquestionComponent implements OnInit {
//   receivedPin: string = '';

//   title = 'WebSocketChatRoom';
//   greetings: string[] = [];
//   disabled = true;
//   newmessage: string ='';
//   private stompClient: any;



//   constructor(public passDataService: PassDataService, private http : HttpClient){}

//   ngOnInit(){
//     this.receivedPin = this.passDataService.myDataPIN || '';
//     console.log(this.receivedPin);
//     this.connect();
//     }
  
//   setConnected(connected: boolean) {
//     this.disabled = !connected;
//     if (connected) {
//       this.greetings = [];
//     }
//   }

//   connect() {
//     const socket = new SockJS('http://localhost:9001/testchat');
//     this.stompClient = Stomp.over(socket);
//     const _this = this;
//     this.stompClient.connect({}, function (frame: string) {
//       console.log('Connected: ' + frame);
//       _this.stompClient.subscribe('/start/initial', function(hello: { body: string; }){
//         console.log(JSON.parse(hello.body));
//         _this.showMessage(JSON.parse(hello.body));
//       });
//    });
//   }

//   sendMessage() {
//     this.stompClient.send(
//       '/current/resume',
//       {},
//       JSON.stringify(this.newmessage)
//     );
//     this.newmessage = "";
//   }

//   showMessage(message: string) {
//     this.greetings.push(message);
//   }


  
// }



import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PassDataService } from 'src/app/_services/pass-data.service';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { Quiz } from 'src/app/_models/quiz.model';
import { Question } from 'src/app/_models/question.model';
import { Answer } from 'src/app/_models/answer.model';

@Component({
  selector: 'app-getquestion',
  templateUrl: './getquestion.component.html',
  styleUrls: ['./getquestion.component.css']
})
export class GetquestionComponent implements OnInit {
  receivedPin: string = '';
  title = 'WebSocketChatRoom';
  greetings: string[] = [];
  disabled = true;
  newmessage: string = '';
  quiz? :Quiz;
  question?:Question;
  playeranswer?: Answer;
  selectedAnswerId? : number | undefined;
  quizCompleted: boolean = false;
  private stompClient: any;


  constructor(public passDataService: PassDataService, private http: HttpClient) { }

  ngOnInit() {
    this.receivedPin = this.passDataService.myDataPIN || '';
    //console.log(this.receivedPin);
    this.connect();
    
    //this.showQuiz();
  }



  connect() {
    const socket = new SockJS('http://localhost:9001/quiz');
    this.stompClient = Stomp.over(socket);
    const _this = this;
    this.stompClient.connect({}, function (frame: string) {
      console.log('Connected: ' + frame);
      _this.stompClient.subscribe(`/quiz/${_this.receivedPin}`, (result: { body: any; }) => {
        const message = result.body;
        try {
          const question = JSON.parse(message);
          console.log('Question:', question);
          _this.handleQuestion(question);
        } catch (error) {
          console.log('Message:', message);
          _this.handleMessage(message);
        }
      });
      _this.startQuiz();
    });
  }
  
  handleQuestion(question: any) {
    if (question && question.hasOwnProperty('id')) {
      this.question = question;
      // Display the question on the frontend and handle user response
      this.selectedAnswerId = undefined;
    }
  }
  
  handleMessage(message: any) {
    if (message === "Quiz completed") {
      this.quizCompleted = true;
      console.log("Quiz completed");
    }
  }
 



  startQuiz() {
    this.stompClient.send(`/game/startQuiz/${this.receivedPin}`, {}, this.receivedPin); 
  }

  showQuiz(quiz: any) {
    // Display the quiz on the frontend
    console.log('Quiz:', quiz);
  }

  selectAnswer(answerId?: number) {
    this.selectedAnswerId=answerId;
  }

  submitAnswer() {
    if (this.selectedAnswerId) {
     
      const userResponse = this.selectedAnswerId;

      // Send the user's response to the server
      this.stompClient.send(`/game/submitResponse/${this.receivedPin}/${this.question?.id}`, {}, userResponse);
    } else {
      // No answer selected, handle accordingly (e.g., show an error message)
    }
  }
  
}



// connect() {
//   const socket = new SockJS('http://localhost:9001/quiz');
//   this.stompClient = Stomp.over(socket);
//   const _this = this;
//   this.stompClient.connect({}, function (frame: string) {
//     console.log('Connected: ' + frame);
//     _this.stompClient.subscribe(`/quiz/${_this.receivedPin}`, (result: { body: any; }) => {
//       const question = JSON.parse(result.body);
//       console.log('Question:', question);
//       _this.handleQuestion(question);
//     });
//     _this.startQuiz();
//   });
// }
// handleQuestion(question: any) {
//   if (question && question.hasOwnProperty('id')) {
//     this.question = question;
//     // Display the question on the frontend and handle user response
//     this.selectedAnswerId = undefined;
//   } else if (question === "Quiz completed") {
//     // Handle quiz completion, e.g., display completion message
//     console.log("Quiz completed");
//   }
  
// }

 
  // connect() {
  //   const socket = new SockJS('http://localhost:9001/quiz');
  //   this.stompClient = Stomp.over(socket);
  //   const _this = this;
  //   this.stompClient.connect({}, function (frame: string) {
  //     console.log('Connected...: ' + frame);
  //     _this.stompClient.subscribe(`/quiz/${_this.receivedPin}`, (result: { body: any; }) => {
  //     _this.quiz=JSON.parse(result.body);
  //     console.log(_this.quiz?.questions);
  //      // _this.showQuiz(quiz.body);
  //   });
  //   _this.startQuiz();
  //   });
  // }