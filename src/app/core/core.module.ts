import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from "@angular/common/http";
import {FileModule} from "../file/file.module";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    FileModule
  ]
})
export class CoreModule { }
