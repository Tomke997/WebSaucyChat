import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import {UserProfileComponent} from "./user-profile/user-profile.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FileModule} from "../file/file.module";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [UserProfileComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FileModule,
    SharedModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule]
})
export class UserModule { }
