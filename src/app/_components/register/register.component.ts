import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/_models/user.model';

const baseUrl = 'http://localhost:9001/api/user';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})


export class RegisterComponent {
  

username: string ="";
email: string = "";
password: string="";
public user= new User();
isResultLoaded=false;
isUpdateFromActive=false;


  constructor(private router : Router, private http: HttpClient){}



  save(){
    // let bodyData = {
    //           "username" : this.user.username,
    //           "password" : this.user.password,
    //           "email" : this.user.email    
    //         }
            let bodyData = {
              "username" : this.username,
              "password" : this.password,
              "email" : this.email    
            }
            console.log(bodyData);
            this.http.post(`${baseUrl}/save`, bodyData, {responseType: 'text'}).subscribe((resultData: any) => {
              console.log(resultData);
              alert("User added successfully");
              this.router.navigate(['/create/hostdashboard'])
            });
    
  }
  back(){
    this.router.navigate(['/create'])
  }

}
