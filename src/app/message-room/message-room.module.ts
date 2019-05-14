import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageRoomRoutingModule } from './message-room-routing.module';
import {MessageListComponent} from "./message-list/message-list.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MessageService} from "../message/shared/message.service";
import {FileService} from "../file/shared/file.service";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [
    MessageListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MessageRoomRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    MessageService,
    FileService,
  ]
})
export class MessageRoomModule { }
