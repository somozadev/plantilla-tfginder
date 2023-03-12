import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserData } from '../../providers/user-data';

import { UserOptions } from '../../interfaces/user-options';



@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
  styleUrls: ['./signup.scss'],
})
export class SignupPage {
  signup: UserOptions = { username: '', password: '' };
  submitted = false;

  constructor(
    public router: Router,
    public userData: UserData
  ) { }

  async onSignup(form: NgForm) {

    if (form.valid) {
      await this.userData.createUser(this.signup.username, this.signup.password);
    }
    if (this.RegistrationValid()) {
      this.submitted = true;
      this.router.navigateByUrl('/app/tabs/schedule');
    }
  }

  RegistrationValid() {
    console.log("registrationValida called : " + this.userData.SIGNUP_CORRECTLY); return this.userData.SIGNUP_CORRECTLY;
  }
}
