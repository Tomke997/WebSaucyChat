import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SharedRoutingModule} from './shared-routing.module';
import {ImageCropperDialogComponent} from "./image-cropper-dialog/image-cropper-dialog.component";
import {MatDialogModule, MatToolbarModule} from "@angular/material";
import {ImageCropperModule} from "ngx-image-cropper";


@NgModule({
  declarations: [
    ImageCropperDialogComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MatDialogModule,
    ImageCropperModule
  ],
  exports: [
    CommonModule,
    SharedRoutingModule,
    MatDialogModule,
    ImageCropperModule],

  entryComponents: [
    ImageCropperDialogComponent
  ],
})
export class SharedModule {
}
