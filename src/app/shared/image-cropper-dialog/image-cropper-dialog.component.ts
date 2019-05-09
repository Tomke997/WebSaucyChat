import {Component,OnInit} from '@angular/core';
import {ImageCroppedEvent} from "ngx-image-cropper";
import {MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-image-cropper-dialog',
  templateUrl: './image-cropper-dialog.component.html',
  styleUrls: ['./image-cropper-dialog.component.scss']
})
export class ImageCropperDialogComponent implements OnInit {
  croppedImage: any = '';
  imageChangedEvent: any = '';
  fileToUpload: File;
  constructor(public dialogRef: MatDialogRef<ImageCropperDialogComponent>) { }

  ngOnInit() {
    this.initializeImageDialog();
  }
  initializeImageDialog() {
    let element: HTMLElement = document.getElementById('imageButton') as HTMLElement;
    element.click();
  }
  uploadNewImage(event) {
    this.imageChangedEvent = event;
    this.fileToUpload = event.target.files[0];
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  SendCroppedImage() {
    const file = {
      originalName: this.fileToUpload.name,
      base64: this.croppedImage
    };
    this.dialogRef.close(file);
  }

  closeWithoutSaving() {
    this.dialogRef.close();
  }
}
