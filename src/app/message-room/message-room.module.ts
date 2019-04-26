import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageRoomRoutingModule } from './message-room-routing.module';
import {MessageListComponent} from "./message-list/message-list.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MessageService} from "../message/shared/message.service";

@NgModule({
  declarations: [
    MessageListComponent
  ],
  imports: [
    CommonModule,
    MessageRoomRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    MessageService
  ]
})
export class MessageRoomModule { }
