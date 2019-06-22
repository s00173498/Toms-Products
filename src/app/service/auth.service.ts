import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { NotificationService } from '../notification.service';
import * as firebase from 'firebase/';
//import { AuthService } from '../service/auth.service';

@Injectable()
export class AuthService {  
  private user: Observable<firebase.User>;
  public loggedInStatus: boolean = false;

  constructor(private _firebaseAuth: AngularFireAuth, private router: Router, private notifier: NotificationService) {
    this.user = _firebaseAuth.authState;
  }
//sign up using name and password
//will send email to a valid email address
//registers user with firebase if all valid
  signup(email: string, password: string, name: string) {
    // clear all messages
    this.notifier.display(false, '');
    this._firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        this.sendEmailVerification();
        const message = 'A verification email has been sent, please check your email and follow the steps!';
        this.notifier.display(true, message);
        return firebase.database().ref('users/' + res.user.uid).set({
          email: res.user.email,
          uid: res.user.uid,
          registrationDate: new Date().toString(),
          name: name
        })
          .then(() => {
            firebase.auth().signOut();
            this.router.navigate(['login']);
          });
      })
      //anything not valid error message
      .catch(err => {
        console.log(err);
        this.notifier.display(true, err.message);
      });
  }
//will send user a validation email
  sendEmailVerification() {
    this._firebaseAuth.authState.subscribe(user => {
      user.sendEmailVerification()
        .then(() => {
          console.log('email sent');
        });
    });
  }
//will register a user with firebase
  doRegister(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
      }, err => reject(err))
    })
  }
//login if user registered with firebase
//and validation email verified
//route navigates to product list
  doLogin(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
        this.loggedInStatus = true;
        this.router.navigate(['product-list']);
      }, err => reject(err))
    })
  }
//will loggout user
  doLogout(){
    return new Promise((resolve, reject) => {
      if(firebase.auth().currentUser){
        this._firebaseAuth.auth.signOut()
        resolve();
      }
      else{
        reject();
      }
      this.loggedInStatus = false;

    });
  }
//check login status
  isLoggedIn():boolean {
      return this.loggedInStatus;
  }
//log in a user with a pop up window 
//user uses there facebook email and password tho do this
  doFacebookLogin(){
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.FacebookAuthProvider();
      this._firebaseAuth.auth
      .signInWithPopup(provider)
      .then(res => {
        resolve(res);
        this.loggedInStatus = true;
      }, err => {
        console.log(err);
        reject(err);
      })
    })
  }
//log in a user with a pop up window 
//user uses there gmail email and password tho do this
 doGoogleLogin(){
  return new Promise<any>((resolve, reject) => {
    let provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    this._firebaseAuth.auth
    .signInWithPopup(provider)
    .then(res => {
      resolve(res);
      this.loggedInStatus = true;
    })
  })
}

}