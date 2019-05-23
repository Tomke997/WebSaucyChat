import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ImageCropperDialogComponent} from "./image-cropper-dialog/image-cropper-dialog.component";

const routes: Routes = [
  {
    path: 'messageToSend',
    component: ImageCropperDialogComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
