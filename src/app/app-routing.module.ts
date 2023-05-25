import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PlayComponent } from './_components/play/play.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './_components/home/home.component';
import { CreateComponent } from './_components/create/create.component';
import { QuestionComponent } from './_components/question/question.component';
import { LoginComponent } from './_components/login/login.component';
import { RegisterComponent } from './_components/register/register.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
   },
    {path: 'home', component: HomeComponent},
    {path: 'play', component: PlayComponent},
    {path: 'create', component: CreateComponent},
    {path: 'question', component: QuestionComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: '**', component: HomeComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]

})
export class AppRoutingModule { }
