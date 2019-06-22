import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { FormGroup } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
  
})
export class SignupComponent implements OnInit {
  //declare various info
  errorMessage: string;
  successMessage: string;
  registerForm: FormGroup;
  email: string;
  password: string;
  name: string;
  description: string;
  form;
  constructor(private authService: AuthService, private myRoute: Router) { }
  ngOnInit() {
  }
//facebook register and route to login 
  tryFacebookLogin(){
    this.authService.doFacebookLogin()
    .then(res =>{
      this.myRoute.navigate(['/login']);
    }, err => console.log(err)
    )
  }
//google register and route navigate to login
  tryGoogleLogin(){
    this.authService.doGoogleLogin()
    .then(res => {
      this.myRoute.navigate(['/login']);
    })
  }
  
  // tryRegister(value){
  //   this.authService.doRegister(value)
  //   .then(res => {
  //     console.log(res);
  //     this.errorMessage = "";
  //     this.myRoute.navigate(['product-list'])
  //   }, err => {
  //     console.log(err);
  //     this.errorMessage = err.message;
  //     this.successMessage = "";
  //   })
  // }
  register() {
    this.authService.signup(this.email, this.password, this.name);
    console.log(this.email);
    console.log(this.password);
    console.log(this.name);
  }

}
