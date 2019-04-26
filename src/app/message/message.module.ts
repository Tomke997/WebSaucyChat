import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MessageService} from "./shared/message.service";


@NgModule({
  declarations: [],

  providers: [
    MessageService
  ],

  imports: [
    CommonModule,
  ]
})
export class MessageModule { }
