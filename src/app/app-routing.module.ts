import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PlayComponent } from './_components/play/play.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './_components/home/home.component';
import { CreateComponent } from './_components/create/create.component';
import { LoginComponent } from './_components/login/login.component';
import { RegisterComponent } from './_components/register/register.component';
import { CreateQuizComponent } from './_components/create/host-dashboard/create-quiz/create-quiz.component';
import { GetquestionComponent } from './_components/getquestion/getquestion.component';
import { ListQuizzesComponent } from './_components/create/host-dashboard/list-quizzes/list-quizzes.component';
import { HostDashboardComponent } from './_components/create/host-dashboard/host-dashboard.component';
import { QuizLeaderboardComponent } from './_components/create/host-dashboard/quiz-leaderboard/quiz-leaderboard.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
   },
    {path: 'home', component: HomeComponent},
    {path: 'play', component: PlayComponent},
    {path: 'getquestion', component: GetquestionComponent},
    {path: 'create', component: CreateComponent},
    {path: 'create/login', component: LoginComponent},
    {path: 'create/register', component: RegisterComponent},
    {path: 'create/hostdashboard', component: HostDashboardComponent},
    {path: 'create/hostdashboard/createQuiz', component: CreateQuizComponent},
    {path: 'create/hostdashboard/listQuizzes', component: ListQuizzesComponent},
    {path: 'create/hostdashboard/quizLeaderboard', component: QuizLeaderboardComponent},
    {path: '**', component: HomeComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]

})
export class AppRoutingModule { }
