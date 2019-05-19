import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/firestore";
import {Log} from "../../shared/model/log";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  constructor(private afs: AngularFirestore,
              private authService: AuthService) {}

  createLogEntry(userData) {
    //gets the firestore path to save to
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`logger/${this.afs.createId()}`);

    const data: Log = {
      email: userData.email,
      timeStamp: Date().toString(),
      ipAddress: 'ipAddress'
    };
    return userRef.set(data, {merge: true})
  }
/*
  getIP() {
    this.authService.getIP()
      .subscribe(
        IPDetails => this.IppDetails,
        error =>  this.errorMessage = <any>error
      );
  }*/
}
