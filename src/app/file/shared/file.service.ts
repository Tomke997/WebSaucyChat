import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {from, Observable} from "rxjs";
import {AngularFireStorage} from "@angular/fire/storage";
import {AngularFireAuth} from "@angular/fire/auth";
import {User} from "../../shared/model/user";
import {flatMap, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private storage: AngularFireStorage,
              private db: AngularFirestore,
              private afAuth: AngularFireAuth) {}

  /**
   * send new image to the storage as a base64
   */
 sendNewFileBase64(base64Image: string, originalFileName: string): Observable<any> {
   const uid = this.db.createId();
   const split = base64Image.split(',');
   const base64EncodedImageString = split[1];
   return from(this.storage.ref('message-pictures/' + uid).putString(base64EncodedImageString,'base64',
     {
       customMetadata: {
         originalName: originalFileName,
         userId: this.afAuth.auth.currentUser.uid
       }
     })).pipe(map(value => {
       return value;
   }))
 }

/**
 * get download URL for picture
 */
  getPictureUrl(id: string): Observable<string> {
    return this.storage.ref('message-pictures/' + id)
      .getDownloadURL();
  }

  getProfilePictureUrl(id: string): Observable<string> {
    return from(
     this.db.firestore.collection("users").doc(id).get()).pipe(
      flatMap( value => {
        const user = value.data() as User;
        if (!!user && user.imageId != null) {
        return this.storage.ref('user-pictures/' + user.imageId)
          .getDownloadURL().pipe(
            map(value1 => {
              if(!!value1)
              return value1;
            })
          );}
        return new Observable();
      })
    )
  }
}
