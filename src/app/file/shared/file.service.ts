import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {AngularFireStorage} from "@angular/fire/storage";

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private storage: AngularFireStorage,
              private db: AngularFirestore) {}

  /**
   * send new image to the storage as a base64
   */
 sendNewFileBase64(base64Image: string, originalFileName: string) {
   const uid = this.db.createId();
   const split = base64Image.split(',');
   const base64EncodedImageString = split[1];
   this.storage.ref('message-pictures/' + uid).putString(base64EncodedImageString,'base64',
     {
       customMetadata: {
         originalName: originalFileName,
         userId: uid
       }
     }).then()
 }

/**
 * get download URL for picture
 */
  getPictureUrl(id: string): Observable<string> {
    return this.storage.ref('message-pictures/' + id)
      .getDownloadURL();
  }
}
