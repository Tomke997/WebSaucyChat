import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ImageCropperDialogComponent } from './image-cropper-dialog.component';
import {ImageCropperModule} from "ngx-image-cropper";
import {MatDialogRef} from "@angular/material";

describe('ImageCropperDialogComponent', () => {
  let component: ImageCropperDialogComponent;
  let fixture: ComponentFixture<ImageCropperDialogComponent>;

 beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageCropperDialogComponent ],
      imports: [ImageCropperModule],
      providers: [{provide: MatDialogRef, useClass: MatDialogRefStub}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageCropperDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

class MatDialogRefStub<ImageCropperDialogComponent> {}

