import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-host-dashboard',
  templateUrl: './host-dashboard.component.html',
  styleUrls: ['./host-dashboard.component.css']
})
export class HostDashboardComponent {
  constructor(private router: Router) { }
  CreateQuiz(){
    this.router.navigate(['/create/hostdashboard/createQuiz'])
  }
  ListQuizzes(){
    this.router.navigate(['create/hostdashboard/listQuizzes'])
  
  }
}
