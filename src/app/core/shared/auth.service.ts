import {Injectable} from '@angular/core';
import {switchMap} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {Router} from "@angular/router";
import {auth} from 'firebase/app';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {User} from "../../shared/model/user";
import {LoggerService} from "./logger.service";
import * as Http from "http";
import {Log} from "../../shared/model/log";

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
    private http: Http
  ) {
    //// Get auth data, then get firestore user document || null
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
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

  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.updateUserData(credential.user)
      })
  }

  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);

    const data: User = {
      email: user.email,
      displayName: user.displayName
    };
    this.logger.createLogEntry(data);
    return userRef.set(data, {merge: true})
  }
//not sure if needed
  isLoggedIn()
  {
    return this.afAuth.auth.currentUser != null;
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }


  /*
// map doesn't work
  getIP() //: Observable<Log[]>
  {
    return this.http.get('http://ipinfo.io') // ...using post request
    .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
    .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
}*/

}
