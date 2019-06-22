import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
title: string = "Toms Products";
isLoggedIn: boolean;
  constructor(private auth: AuthService, private myRouth: Router) { }
//bool to detering if logged in
  userLoggedIn():boolean{
    this.isLoggedIn = this.auth.isLoggedIn();
    return this.isLoggedIn
  }
//on selecting log out route navigate to the login page
  onLogout() {
    this.auth.doLogout();
    this.isLoggedIn = this.auth.isLoggedIn();
    this.myRouth.navigate(['login']);
  }
  ngOnInit() {
    this.isLoggedIn = this.auth.isLoggedIn();
  }

}
