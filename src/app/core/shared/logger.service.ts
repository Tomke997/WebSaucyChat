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
  constructor(private afs: AngularFirestore ,
              private http: HttpClient
  ) {
    this.getIP();
  }

  createLogEntry(userData) {
    //gets the firestore path to save to
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`logger/${this.afs.createId()}`);

    this.getIP().subscribe(log => { debugger;
      const data: Log = {
        email: userData.email,
        timeStamp: Date().toString(),
        ip: log.ip
      };
      return userRef.set(data, {merge: true})
    })


  }


  getIP()
  {
    return this.http.get<Log>('https://jsonip.com')
      .pipe(// ...using post request
        tap(log => {debugger;}),
        catchError((error:any) => Observable.throw(error.json().error || 'Server error'))
      )//...errors if any
  }/**/

}
