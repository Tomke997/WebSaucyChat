import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";
import {MessageService} from "../../message/shared/message.service";
import {Observable} from "rxjs";
import {Message} from "../../message/shared/message";
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss']
})
export class MessageListComponent implements OnInit {
  messageForm = new FormControl('');
  allMessages$: Observable<Message[]>;
  imageChangedEvent: any = '';
  croppedImage: any = '';

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.allMessages$ = this.messageService.getAllMessages();

  }

  /**
   * send message and reset the text field
   */
  onSendClick() {
    if (this.messageForm.value !== "") {
      //send message
      this.messageService.sendNewMessage(this.messageForm.value).subscribe();
      //reset field
      this.messageForm.setValue("");
    }
  }

  uploadNewImage(event) {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    console.log(this.croppedImage);
  }

}
