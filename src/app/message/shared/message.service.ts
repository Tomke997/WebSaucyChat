import {Injectable} from '@angular/core';
import {Message} from "./message";
import {defer, Observable} from "rxjs";
import {map, tap} from "rxjs/operators";
import {AngularFirestore} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private db: AngularFirestore) {
  }

  /**
   * create message metadata
   */
  createNewMessage(messageText: string, pictureId?: string): Message {
    let newMessage: Message = {
      text: messageText,
      time: new Date(),
      userId: "UserNo1",
    };
    if(!!pictureId) {
      newMessage.imageId = pictureId;
    }
    console.log("message metadata was created");
    return newMessage;
  }

  /**
   * ! firestone
   * send new message without picture
   */
  sendNewMessage(messageText: string): Observable<Message> {
    let newMessage = this.createNewMessage(messageText);
    const messageCollection = this.db.collection<any>('messages');
    return defer( () =>
      messageCollection.add(newMessage)
    ).pipe(map( messageRef => {
      newMessage.id = messageRef.id;
      console.log(`new message text: ${newMessage.text} ${newMessage.id}`);
      return newMessage;
    }))
  }

  /**
   *  ! firestone
   * get all messages from data and sort them by date
   */
  getAllMessages(): Observable<Message[]>{
    return this.db.collection('messages').snapshotChanges().pipe(map( value => {
      const listOfMessages: Message[] = [];
      value.forEach( message => {
       /* const data = message.data() as Message;*/
        const data = message.payload.doc.data() as Message;
        // @ts-ignore
        data.time = new Date(data.time.seconds * 1000);
        return  listOfMessages.push(data);
      });
      return listOfMessages.sort((a, b) => a.time.getTime() - b.time.getTime());
    }));
  }

}
