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
  /**
   * open image dialog
   */
  initializeImageDialog() {
    let element: HTMLElement = document.getElementById('imageButton') as HTMLElement;
    element.click();
  }
  /**
   * get selected file
   */
  uploadNewImage(event) {
    this.imageChangedEvent = event;
    this.fileToUpload = event.target.files[0];
  }

  /**
   * get base64 from cropped image
   */
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  /**
   * close dialog window and send croppedImage
   */
  SendCroppedImage() {
    const file = {
      originalName: this.fileToUpload.name,
      base64: this.croppedImage
    };
    this.dialogRef.close(file);
  }

  /**
   * close dialog window
   */
  closeWithoutSaving() {
    this.dialogRef.close();
  }
}
