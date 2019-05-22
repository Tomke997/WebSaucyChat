import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/firestore";
import {Log} from "../../shared/model/log";
import {catchError, tap} from "rxjs/operators";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  constructor(private afs: AngularFirestore,
              private http: HttpClient
  ) {}

  createLogEntry(userData) {
    //gets the firestore path to save to
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`logger/${this.afs.createId()}`);

    this.getIP().subscribe(log => {
      const data: Log = {
        email: userData.email,
        timeStamp: Date().toString(),
        ip: log.ip
      };
      //saves the log to the firestore path
      return userRef.set(data, {merge: true})
    })
  }

  getIP()
  {
    return this.http.get<Log>('https://jsonip.com')// ...using http request, get json ip
      .pipe(
        tap(log => {}),
        catchError((error:any) => Observable.throw(error.json().error || 'Server error'))//...errors if any
      )
  }
}
