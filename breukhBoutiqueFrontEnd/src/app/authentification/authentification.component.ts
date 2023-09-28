import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthentificationService } from '../service/authentification.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from '../command-interface';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css']
})
export class AuthentificationComponent implements OnInit {

  loginFormGroup!:FormGroup
  profil!:User;
  OpenNotifications:boolean = false

  constructor(private authentificationService:AuthentificationService,private fb:FormBuilder,private router :Router){
    this.loginFormGroup = this.fb.group({
      username:[""],
      password:[""],
    })
  }
  ngOnInit(){
    if(this.authentificationService.getToken()){
      this.router.navigateByUrl('/vente');
    }
  }

  closeNotification(){
    this.OpenNotifications = false;
  }


  login(){
    this.authentificationService.login(this.loginFormGroup.get("username")?.value,this.loginFormGroup.get("password")?.value).subscribe(
      (data)=>{
        // this.router.navigate(['/nav']);
      },
      (error)=>{
        this.OpenNotifications = true
      }
    )
  }




  logout(){
    this.authentificationService.logout()
  }
}
