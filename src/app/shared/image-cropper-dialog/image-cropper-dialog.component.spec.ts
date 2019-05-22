import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ImageCropperDialogComponent} from './image-cropper-dialog.component';
import {ImageCroppedEvent, ImageCropperModule} from "ngx-image-cropper";
import {MatDialogRef} from "@angular/material";
import {DOMHelper} from "../../../testing/dom-helper";
import {MessageListComponent} from "../../message-room/message-list/message-list.component";

describe('ImageCropperDialogComponent', () => {
  let component: ImageCropperDialogComponent;
  let fixture: ComponentFixture<ImageCropperDialogComponent>;
  let dh: DOMHelper<ImageCropperDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ImageCropperDialogComponent],
      imports: [ImageCropperModule],
      providers: [{provide: MatDialogRef, useClass: MatDialogRefStub}]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageCropperDialogComponent);
    component = fixture.componentInstance;
    dh = new DOMHelper(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /*
      it('should call SendCroppedImage if OK button clicked', () => {
        spyOn(component, 'sendCroppedImage');
        dh.clickButton('OK');
        expect(component.sendCroppedImage).toHaveBeenCalledTimes(1)  });
    /*
      it('should call closeWithoutSaving if CANCEL button clicked', () => {
        spyOn(component, 'closeWithoutSaving');
        dh.clickButton('CANCEL');
        expect(component.closeWithoutSaving).toHaveBeenCalledTimes(1);
      });
    */
});

/*
<button (click)="closeWithoutSaving()">CANCEL</button>
<Button (click)="SendCroppedImage()">OK</Button>
 */
class MatDialogRefStub<ImageCropperDialogComponent> {
  initializeImageDialog() {
  }

  uploadNewImage(event) {
  }

  imageCropped(event: ImageCroppedEvent) {
  }

  SendCroppedImage() {
  }

  closeWithoutSaving() {
  }
}


