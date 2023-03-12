import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserData } from '../../providers/user-data';

import { UserOptions } from '../../interfaces/user-options';



@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styleUrls: ['./login.scss'],
})
export class LoginPage {
  login: UserOptions = { username: '', password: '' };
  submitted = false;

  constructor(
    public userData: UserData,
    public router: Router
  ) { }

  async onLogin(form: NgForm) {

    if (form.valid) {
      await this.userData.loginUser(this.login.username, this.login.password);
    }
    if (this.LoginValid()){
    this.submitted = true;
      this.router.navigateByUrl('/app/tabs/schedule');}
  }

  LoginValid() {
    console.log("loginValida called : " + this.userData.LOGGEDIN_CORRECTLY); return this.userData.LOGGEDIN_CORRECTLY;
  }
  onSignup() {
    this.router.navigateByUrl('/signup');
  }
}
