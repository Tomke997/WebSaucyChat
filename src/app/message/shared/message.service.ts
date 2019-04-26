import { Injectable } from '@angular/core';
import {Message} from "./message";

@Injectable({
  providedIn: 'root'
})
export class MessageService {
newMessage: Message;
  constructor() { }

  /**
   * create message model
   */
    createNewMessage(messageText: string) {
    this.newMessage = new Message();
    this.newMessage = {
      text: messageText,
      time: new Date(),
      userId: "Tomek"
    };
    console.log(this.newMessage.text);
  }
}
