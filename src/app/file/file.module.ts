import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FileService} from "./shared/file.service";

@NgModule({
  declarations: [],

  providers: [
    FileService
  ],

  imports: [
    CommonModule,
  ]
})
export class FileModule { }
