import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/firestore";

import {AngularFireAuth} from "@angular/fire/auth";
import {Log} from "../../shared/model/log";
import DateTimeFormat = Intl.DateTimeFormat;
import {formatDate} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,) {}

  createLogEntry(userData) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`logger/${this.afs.createId()}`);

    const data: Log = {
      email: userData.email,
      timeStamp: Date().toString(),
      ipAddress: 'ipAddress'
    };
    return userRef.set(data, {merge: true})
  }

  getIpAddress()
  {

  }
}
