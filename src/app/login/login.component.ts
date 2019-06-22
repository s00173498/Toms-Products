import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //declare error message and form
  errorMessage: string;
  loginForm: FormGroup;
form;
//consstructor with firebase validation
  constructor(private fb: FormBuilder, private myRoute: Router,
    private authService: AuthService,) { 
      this.form = fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
      });
    }
  ngOnInit() {
  } 
  //Login with route navigation to bring to the product list
  Login(){
        this.authService.doLogin(this.form.value)
        .then(res => {
          console.log(res);
          this.myRoute.navigate(['/product-list']);
        }, err => {
          console.log(err);
          this.errorMessage = err.message;
        })
      }
//login with facebook button 
//if sucessfull route navigate to product list
  tryFacebookLogin(){
    this.authService.doFacebookLogin()
    .then(res => {
      this.myRoute.navigate(['/product-list']);
    })
  }
//login with google button 
//if sucessfull route navigate to product list
  tryGoogleLogin(){
    this.authService.doGoogleLogin()
    .then(res => {
      this.myRoute.navigate(['/product-list']);
    })
  }
}




































