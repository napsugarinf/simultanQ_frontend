import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http'
import { AppComponent } from './app.component';
import { PlayComponent } from './_components/play/play.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './_components/home/home.component';
import { CreateComponent } from './_components/create/create.component';
import { LoginComponent } from './_components/login/login.component';
import { RegisterComponent } from './_components/register/register.component';
import { CreateQuizComponent } from './_components/create/host-dashboard/create-quiz/create-quiz.component';
import { GetquestionComponent } from './_components/getquestion/getquestion.component';
import { PassDataService } from './_services/pass-data.service';
import { PlayquizService } from './_services/playquiz.service';
import { HostDashboardComponent } from './_components/create/host-dashboard/host-dashboard.component';
import { ListQuizzesComponent } from './_components/create/host-dashboard/list-quizzes/list-quizzes.component';
import { QuizLeaderboardComponent } from './_components/create/host-dashboard/quiz-leaderboard/quiz-leaderboard.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayComponent,
    HomeComponent,
    CreateComponent,
    LoginComponent,
    RegisterComponent,
    CreateQuizComponent,
    GetquestionComponent,
    HostDashboardComponent,
    ListQuizzesComponent,
    QuizLeaderboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    FormsModule,
    HttpClientModule
  ],
  providers: [PassDataService, PlayquizService],
  bootstrap: [AppComponent]
})
export class AppModule { }
