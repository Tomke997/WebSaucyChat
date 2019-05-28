import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../core/shared/auth.service";
import {FormControl, FormGroup} from "@angular/forms";
import {ImageCropperDialogComponent} from "../../shared/image-cropper-dialog/image-cropper-dialog.component";
import {MatDialog} from "@angular/material";
import {FileService} from "../../file/shared/file.service";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });
  croppedImage: string = '';

  constructor(private auth: AuthService,
              private dialog: MatDialog,
              private file: FileService) {
  }

  ngOnInit() {
  }

  onClickConnect() {
    this.auth.googleLogin();
  }

  onClickLogOut() {
    this.auth.signOut();
  }

  onClickRemoveUser() {
    this.auth.removeUser();
  }

  createAccount() {
    const form = this.loginForm.value;
    this.auth.createNewUser(form.email, form.password)
      .then(() => console.log('Button clicked'))
      .catch(error => {
      console.log(error);
    });
  }

  onSubmit() {
    const form = this.loginForm.value;
    this.auth.loginWithEmailAndPassword(form.email, form.password)
      .then(() => console.log('Button clicked'))
      .catch(error => {
      console.log(error);
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ImageCropperDialogComponent, {
      width: '600px',
      data: {
        file: this.croppedImage
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (!!result) {
        this.file.sendNewFileBase64(result.base64, result.originalName,true);
      }
    });
  }
}
