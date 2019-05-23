import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";
import {MessageService} from "../../message/shared/message.service";
import {Observable} from "rxjs";
import {Message} from "../../shared/model/message";
import {MatDialog} from '@angular/material';
import {ImageCropperDialogComponent} from "../../shared/image-cropper-dialog/image-cropper-dialog.component";
import {AngularFireAuth} from "@angular/fire/auth";
import {HttpClientModule} from "@angular/common/http";
import * as firebase from "firebase";

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss']
})
export class MessageListComponent implements OnInit {
  messageForm = new FormControl('');
  allMessagesArray: Message[] = [];
  //allMessages$: Observable<Message[]>;
  croppedImage: string = '';
  messageToSend: string = '';
  constructor(private messageService: MessageService,
              private dialog: MatDialog,
              private afAuth: AngularFireAuth,
              private http: HttpClientModule) {
  }

  ngOnInit() {
    this.messageService.getAllMessages(this.allMessagesArray).subscribe( value => {
      this.allMessagesArray = value;
      });
    // this.allMessages$ = this.messageService.getAllMessages();
  }
  /**
   * send message and clear the text field
   */
  onSendClick() {
    if (this.messageForm.value !== "") {

      //remove line break from message
      this.messageToSend = this.messageForm.value;
      if(this.messageToSend.includes('\n')) {
        this.messageToSend = this.messageToSend.replace('\n','');
      }
      var getMess = firebase.functions().httpsCallable('getMessagesInformation');
      getMess('mkGVyaLuFjVIJiQXisz42qKEsh42').then( value => {
        console.log('stuffe '+ value.data.data);
        }
      );

      //send message
      this.messageService.sendNewMessage(this.messageToSend).subscribe();
      //reset field
      this.messageForm.setValue("");
    }
  }

  /**
   * send message on enter click
   */
  submitTextOnKeyPress($event: KeyboardEvent) {
    if ($event.key === "Enter") {
      this.onSendClick();
    }
  }

  /**
   * open dialog window with imageCropper / send picture to the storage
   */
  openDialog(): void {
    const dialogRef = this.dialog.open(ImageCropperDialogComponent, {
      width: '600px',
      data: {
        file: this.croppedImage
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(!!result) {
        this.messageService.sendNewFIleToStorageBase64(result.base64,result.originalName);
      }
    });
  }
}
