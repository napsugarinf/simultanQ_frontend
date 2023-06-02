import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/_models/user.model';
import { UserIdServiceService } from 'src/app/_services/user-id-service.service';

const baseUrl = 'http://localhost:9001/api/user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent {

user =new User();
isResultLoaded=false;
isUpdateFromActive=false;


  constructor(private router : Router, private http: HttpClient, private userIdService: UserIdServiceService){}
  login(){
    let bodyData = {
      "email": this.user.email,
      "password" : this.user.password
    }
      //console.log(this.user.email);
      //console.log(this.user.password);
      

      this.http.post(`${baseUrl}/login`, bodyData).subscribe((resultData : any) => {
          console.log(resultData);
          if(resultData.message == "Email does not exists") {

            alert("Email does not exist!");
          }
          else if (resultData.message == "Login success" ){
            this.userIdService.myDataUserId=resultData.userId;
            console.log(this.userIdService.myDataUserId);
            this.router.navigate(['/create/hostdashboard']);
          }
          else {
            alert("Incorrect email and password not match");
          }


      });
  }

 
 back(){
    this.router.navigate(['/create'])
  }
 

}
