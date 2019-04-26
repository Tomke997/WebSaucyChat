import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";
import {MessageService} from "../../message/shared/message.service";

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss']
})
export class MessageListComponent implements OnInit {
  messageForm = new FormControl('');

  constructor(private messageService: MessageService) { }

  ngOnInit() {
  }

  /**
   * send message and reset the text field
   */
  onSendClick() {
    if (this.messageForm.value !== "") {
      //send message
      this.messageService.createNewMessage(this.messageForm.value);
      //reset field
      this.messageForm.setValue("");
    }
  }

}
