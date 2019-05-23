import {Injectable} from '@angular/core';
import {Message} from "../../shared/model/message";
import {defer, Observable} from "rxjs";
import {map} from "rxjs/operators";
import {AngularFirestore} from "@angular/fire/firestore";
import {HttpClient} from "@angular/common/http";
import {FileService} from "../../file/shared/file.service";
import {AuthService} from "../../core/shared/auth.service";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    private db: AngularFirestore,
    private http: HttpClient,
    private fileService: FileService,
    private auth: AuthService
  ) {
  }

  /**
   * create message metadata
   */
  createNewMessage(messageText: string): Message {
    let newMessage: Message = {
      text: messageText,
      time: new Date(),
      userId: ''
    };
    console.log("message metadata was created");
    return newMessage;
  }

  /**
   * send new message without picture
   */
  sendNewMessage(messageText: Message): Observable<any> {
    let newMessage = this.createNewMessage(messageText.text);
    const messageCollection = this.db.collection<any>('messages');

    return defer(() =>
      messageCollection.add(newMessage)
    ).pipe(map(messageRef => {
      newMessage.id = messageRef.id;
      console.log('new message text: ${newMessage.text} ${newMessage.id}');
      return newMessage;
    }))
  }

  /**
   * get all messages from database and sort them by date
   */
  getAllMessages(collection?: Message[]): Observable<Message[]> {
    return this.db.collection('messages').snapshotChanges().pipe(map(value => {
      let listOfMessages: Message[];
      listOfMessages = collection;

      value.forEach(message => {
        /* const data = message.data() as Message;*/
        const data = message.payload.doc.data() as Message;
        data.id = message.payload.doc.id;

        if (!this.checkObjectInArray(listOfMessages, data.id)) {
          if (!!data.imageId) {
            this.fileService.getPictureUrl(data.imageId).subscribe(pictureUri => {
              data.pictureUri = pictureUri;
            })
          }
          // @ts-ignore
          data.time = new Date(data.time.seconds * 1000);
          return listOfMessages.push(data);
        }
      });
      return listOfMessages.sort((a, b) => a.time.getTime() - b.time.getTime());
    }));
  }

  /**
   * check if message is in the array
   */
  checkObjectInArray(array: Message[], id: string): boolean {
    let isInArray = false;
    array.forEach(stuff => {
      if (stuff.id == id) {
        isInArray = true;
      }
    });
    return isInArray;
  }

  /**
   * This is just here since we need full crud in our ngxs store, regardless of if we use it or not
   * @param message
   * @param id
   */
  updateMessage(message: Message, id: string): Observable<any> {
    return null;
  }

  /**
   * This is just here since we need full crud in our ngxs store, regardless of if we use it or not
   * @param id
   */
  deleteMessage(id: string): Observable<any> {
    return null;
  }
}
