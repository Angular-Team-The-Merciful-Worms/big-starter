import { element } from 'protractor';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { User } from '../profile/user';

import { Observable } from "rxjs/Observable";

@Injectable()
export class AuthService {

  authState: any = null;
  user: User;

  constructor(private afAuth: AngularFireAuth,

    private db: AngularFireDatabase,
    private router: Router) {
    this.afAuth.authState.subscribe((auth) => {
      this.authState = auth;
      this.currentUserData().subscribe(u => {
        this.user = u;
      });
    });
  }

  // Returns true if user is logged in
  get authenticated(): boolean {
    return !!this.authState;
  }

  // Returns current user data
  get currentUser(): any {
    return this.authenticated ? this.authState : null;
  }

  // Returns
  get currentUserObservable(): any {
    return this.afAuth.authState;
  }

  // Returns current user UID
  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : '';
  }

  // Returns current user display name or Guest
  currentUserData(): Observable<User> {
    return this.db.object(`users/${this.currentUserId}`) as Observable<User>;
  }

  //// Social Auth ////
  githubLogin() {
    const provider = new firebase.auth.GithubAuthProvider();
    return this.socialSignIn(provider);
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.socialSignIn(provider);
  }

  facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider();
    return this.socialSignIn(provider);
  }

  twitterLogin() {
    const provider = new firebase.auth.TwitterAuthProvider();
    return this.socialSignIn(provider);
  }

  private socialSignIn(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.authState = credential.user;
        this.updateUserData(credential);
      })
      .catch(error => console.log(error));
  }

  //// Email/Password Auth ////
  emailSignUp(input: User) {
    return this.afAuth.auth.createUserWithEmailAndPassword(input.email, input.password)
      .then((u) => {
        this.authState = u;
        this.updateUserData(input);
      });
  }

  emailLogin(input: User) {
    return this.afAuth.auth.signInWithEmailAndPassword(input.email, input.password)
      .then((u) => {
        this.authState = u;
      });
  }

  // Sends email allowing user to reset password
  resetPassword(email: string) {
    const fbAuth = firebase.auth();

    return fbAuth.sendPasswordResetEmail(email)
      .then(() => console.log('email sent'))
      .catch((error) => console.log(error));
  }

  //// Sign Out ////
  signOut(): void {
    this.afAuth.auth.signOut();
    this.router.navigate(['/']);
  }

  //// Helpers ////
  private updateUserData(input: User): void {
    // Writes user name and email to realtime db
    // useful if your app displays information about users or for admin features
    const path = `users/${this.currentUserId}`; // Endpoint on firebase
    const data = {
      email: this.authState.email,
      name: input.firstname ? input.firstname + ' ' + input.lastname : this.authState.displayName,
      firstname: input.firstname,
      lastname: input.lastname,
      balance: 0,
    };

    this.db.object(path).update(data)
      .catch(error => console.log(error));
  }
}
