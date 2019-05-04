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

  getPictureUrl(id: string): Observable<string> {
    return this.storage.ref('message-pictures/' + id)
      .getDownloadURL();
  }
}
