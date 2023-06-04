import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, user } from '@angular/fire/auth';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserData {
  favorites: string[] = [];
  HAS_LOGGED_IN = 'hasLoggedIn';
  HAS_SEEN_TUTORIAL = 'hasSeenTutorial';

  SIGNUP_CORRECTLY: boolean = false;
  LOGGEDIN_CORRECTLY: boolean = false;

  constructor(
    public auth: Auth,
    public router: Router,
    public storage: Storage
  ) { }

  async createUser(email: string, password: string) {
    await createUserWithEmailAndPassword(this.auth, email, password).then((result) => {
      console.log("result from singing up ");
      console.log(result.user);
      this.SIGNUP_CORRECTLY = true;
      this.signup(email, password);
    }).catch((error) => {
      console.log(error)
      this.SIGNUP_CORRECTLY = false;
      // https://tgfinder-c5906.firebaseapp.com/__/auth/handler
    });
  }
  async loginUser(email: string, password: string) {

    await signInWithEmailAndPassword(this.auth, email, password).then((result) => {

      console.log("result from singing in ");
      console.log(result.user);
      this.LOGGEDIN_CORRECTLY = true;
      this.login(email, password);

    }).catch((error) => {
      //credentials wrong update visuals etc
      console.log(error)
      this.LOGGEDIN_CORRECTLY = false;
    });
  }
  async signoutUser() {
    await this.auth.signOut();
  }
  hasFavorite(sessionName: string): boolean {
    return (this.favorites.indexOf(sessionName) > -1);
  }

  addFavorite(sessionName: string): void {
    this.favorites.push(sessionName);
  }

  removeFavorite(sessionName: string): void {
    const index = this.favorites.indexOf(sessionName);
    if (index > -1) {
      this.favorites.splice(index, 1);
    }
  }

  login(username: string, password: string): Promise<any> {
    return this.storage.set(this.HAS_LOGGED_IN, true).then(() => {
      this.setUsername(username);
      // this.loginUser(username, password);
      return window.dispatchEvent(new CustomEvent('user:login'));
    });
  }

  signup(username: string, password: string): Promise<any> {
    return this.storage.set(this.HAS_LOGGED_IN, true).then(() => {
      this.setUsername(username);
      // this.createUser(username, password);
      return window.dispatchEvent(new CustomEvent('user:signup'));
    });
  }

  logout(): Promise<any> {
    return this.storage.remove(this.HAS_LOGGED_IN).then(() => {
      return this.storage.remove('username');
    }).then(() => {
      window.dispatchEvent(new CustomEvent('user:logout'));
    });
  }

  setUsername(username: string): Promise<any> {
    return this.storage.set('username', username);
  }

  getUsername(): Promise<string> {
    return this.storage.get('username').then((value) => {
      return value;
    });
  }

  isLoggedIn(): Promise<boolean> {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value === true;
    });
  }

  checkHasSeenTutorial(): Promise<string> {
    return this.storage.get(this.HAS_SEEN_TUTORIAL).then((value) => {
      return value;
    });
  }
}
