import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SharedRoutingModule} from './shared-routing.module';
import {ImageCropperDialogComponent} from "./image-cropper-dialog/image-cropper-dialog.component";
import {MatDialogModule, MatToolbarModule} from "@angular/material";
import {ImageCropperModule} from "ngx-image-cropper";
import {NavbarComponent} from "./navbar/navbar.component";


@NgModule({
  declarations: [
    ImageCropperDialogComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MatDialogModule,
    ImageCropperModule,
    MatToolbarModule
  ],
  exports: [
    CommonModule,
    SharedRoutingModule,
    MatDialogModule,
    ImageCropperModule,
    MatToolbarModule],/**/

  entryComponents: [
    ImageCropperDialogComponent
  ],
})
export class SharedModule {
}
