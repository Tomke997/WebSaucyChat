import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {defer, Observable} from "rxjs";
import {AngularFireStorage} from "@angular/fire/storage";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private storage: AngularFireStorage,
              private db: AngularFirestore) {}
  /*
   * send file to the storage
   */
  public sendNewFile(newFile: File):Observable<File> {
    const uid = this.db.createId();
    return defer(() =>
      this.storage.ref('message-pictures/' + uid)
        .put(newFile, {
          customMetadata: {
            originalName: newFile.name,
            userId: uid
          }
        })
        .then()
    ).pipe(
      map(fileRef => {
        fileRef.id = uid;
        return fileRef;
      })
    );
  }
  /*
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
/*
 * get download URL for picture
 */
  getPictureUrl(id: string): Observable<string> {
    return this.storage.ref('message-pictures/' + id)
      .getDownloadURL();
  }
}
