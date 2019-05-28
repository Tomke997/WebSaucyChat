import {AfterViewChecked, AfterViewInit, Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";
import {Message} from "../../shared/model/message";
import {MatDialog} from '@angular/material';
import {ImageCropperDialogComponent} from "../../shared/image-cropper-dialog/image-cropper-dialog.component";

// ngxs store related
import {Select, Store} from '@ngxs/store';
import {AddMessage, GetMessages, StopMessage} from "../ngxs-actions/message.actions";
import {MessageState} from "../ngsx-state/message.state";
import {FileService} from "../../file/shared/file.service";
import {AuthService} from "../../core/shared/auth.service";

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss']
})

export class MessageListComponent implements OnInit, AfterViewChecked {
  @Select(MessageState.getMessagesList) messages: Observable<Message[]>;

  messageForm = new FormControl('');
  container: HTMLElement;
  allMessagesArray: Message[] = [];
  croppedImage: string = '';
  messageToSend: string;
  userId: string;

  constructor(private fileService: FileService,
              private dialog: MatDialog,
              private store: Store,
              private auth: AuthService) {
  }

  ngOnInit() {
    this.userId = this.auth.getCurrentUserId();
    this.store.dispatch(new GetMessages(this.allMessagesArray));
  }

  ngAfterViewChecked() {
    this.container = document.getElementById("messageList");
    this.container.scrollTop = this.container.scrollHeight;
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
   
      //send message
      this.store.dispatch(new AddMessage({text: this.messageToSend}))
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
      if (!!result) {
        this.fileService.sendNewFileBase64(result.base64, result.originalName);
      }
    });
  }

  /**
   * log out user via AuthService
   */
  onClickLogOut(): void {
    this.store.dispatch(new StopMessage());
    this.auth.signOut();
  }
}
