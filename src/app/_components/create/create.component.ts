import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})

export class CreateComponent {
  constructor(private router: Router) { }
Login(){
  this.router.navigate(['/create/login'])
}
Register(){
  this.router.navigate(['/create/register'])

}



}
