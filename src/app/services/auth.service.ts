import { Injectable } from '@angular/core';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private uid?: string;

  constructor() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        this.uid = uid;
      } else {
        // User is signed out
        // ...
      }
    });
  }

  registerUser(email: string, password: string) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }

  loginUser(email: string, password: string) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }

  isAuthenticated() {
    return this.uid ? true : false;
  }

  getUid() {
    return this.uid;
  }

  signOutUser() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log('user successfully logged out');
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
