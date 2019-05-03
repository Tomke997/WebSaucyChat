import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageRoomRoutingModule } from './message-room-routing.module';
import {MessageListComponent} from "./message-list/message-list.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MessageService} from "../message/shared/message.service";
import {ImageCropperModule} from "ngx-image-cropper";
import {FileService} from "../file/shared/file.service";

@NgModule({
  declarations: [
    MessageListComponent
  ],
  imports: [
    CommonModule,
    MessageRoomRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ImageCropperModule
  ],
  providers: [
    MessageService,
    FileService
  ]
})
export class MessageRoomModule { }
