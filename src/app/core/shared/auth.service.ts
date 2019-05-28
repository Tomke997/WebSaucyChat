import {Injectable} from '@angular/core';
import {map, switchMap} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {Router} from "@angular/router";
import {auth} from 'firebase/app';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {User} from "../../shared/model/user";
import {LoggerService} from "./logger.service";
import {FileService} from "../../file/shared/file.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private logger: LoggerService,
    private file: FileService
  ) {
    // Get auth data, then get firestore user document || null
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges().pipe(switchMap(value => {
            const currentUser = value;
            return this.file.getProfilePictureUrl(user.uid).pipe(map(downloadUri => {
              currentUser.imageId = downloadUri;
              return currentUser;
            }))
          }))
        } else {
          return of(null)
        }
      })
    )
  }

  googleLogin() {
    const provider = new auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        //this.logger.createLogEntry(credential.user.email);
        this.updateUserData(credential);
      })
  }

  // Sets user data to firestore on login
  updateUserData(user) {
    //gets path to firestore
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
      const data: User = {
        email: user.email,
        displayName: null,
        imageId: null
      };

    this.logger.createLogEntry(data);
    return userRef.set(data, {merge: true})
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }

  getCurrentUserId(): string {
    return this.afAuth.auth.currentUser.uid;
  }

  removeUser() {
    this.afAuth.auth.currentUser.delete();
  }

  createNewUser(email: any, password: any) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((credential) => {
      this.updateUserData(credential.user)
    });
  }

  loginWithEmailAndPassword(email: any, password: any) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((credential) => {
        this.logger.createLogEntry(credential.user.email);
    });
  }
}
