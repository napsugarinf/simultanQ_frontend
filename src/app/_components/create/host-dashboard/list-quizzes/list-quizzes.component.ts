import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PassDataService } from 'src/app/_services/pass-data.service';
import { PlayquizService } from 'src/app/_services/playquiz.service';
import { UserIdServiceService } from 'src/app/_services/user-id-service.service';

@Component({
  selector: 'app-list-quizzes',
  templateUrl: './list-quizzes.component.html',
  styleUrls: ['./list-quizzes.component.css']
})
export class ListQuizzesComponent {
userId = this.userIdService.myDataUserId || '';
displayedQuizzes: { pin: string, title: string }[] = [];

constructor(private playQuizService: PlayquizService, 
  private http: HttpClient, 
  private userIdService: UserIdServiceService, 
  private passDataService: PassDataService, 
  private router: Router) {}

ngOnInit(){
  
  this.loadQuizzes();
}

loadQuizzes() {
  this.playQuizService.getAllByUserId(this.userId).subscribe(
    (response: any) => {
      this.displayedQuizzes = response.map((quiz: any) => {
        return {
          pin: quiz.pin,
          title: quiz.title
        };
    }
  );

} );
}

startQuiz(pin: string){
  this.passDataService.myDataPlayQuizPin=pin;
  this.router.navigate(['create/hostdashboard/quizLeaderboard'])
}
}
