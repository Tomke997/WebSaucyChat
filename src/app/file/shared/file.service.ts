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

  public sendNewFile(newFile: File, text: string):Observable<File> {
    const uid = this.db.createId();
    return defer(() =>
      this.storage.ref('message-pictures/' + uid)
        .put(newFile, {
          customMetadata: {
            originalName: newFile.name,
            message: text,
            userId: 'userTestPicture'
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

 sendNewFileBase64(base64Image: string, text: string, originalFileName: string) {
   const uid = this.db.createId();
   const split = base64Image.split(',');
   const base64EncodedImageString = split[1];
   this.storage.ref('message-pictures/' + uid).putString(base64EncodedImageString,'base64',
     {
       customMetadata: {
         originalName: originalFileName,
         message: text,
         userId: 'userTestPicture'
       }
     }).then()
 }

  getPictureUrl(id: string): Observable<string> {
    return this.storage.ref('message-pictures/' + id)
      .getDownloadURL();
  }
}
