import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MessageService} from "./shared/message.service";
import {FileService} from "../file/shared/file.service";

@NgModule({
  declarations: [],

  providers: [
    MessageService,
    FileService
  ],

  imports: [
    CommonModule,
  ]
})
export class MessageModule {
}
