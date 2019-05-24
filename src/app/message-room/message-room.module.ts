import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageRoomRoutingModule } from './message-room-routing.module';
import {MessageListComponent} from "./message-list/message-list.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MessageService} from "../message/shared/message.service";
import {FileService} from "../file/shared/file.service";
import {SharedModule} from "../shared/shared.module";

import { NgxsModule } from '@ngxs/store';
import { MessageState } from './ngsx-state/message.state';
//import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';

@NgModule({
  declarations: [
    MessageListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MessageRoomRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxsModule.forRoot([
      MessageState
    ]),
    //NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot()
  ],
  providers: [
    MessageService,
    FileService,
  ]
})
export class MessageRoomModule { }
