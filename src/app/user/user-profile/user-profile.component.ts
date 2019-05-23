import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../core/shared/auth.service";
import {FormControl, FormGroup} from "@angular/forms";

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

  constructor(public auth: AuthService) {
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
    this.auth.createNewUser(form.email, form.password).catch(error => {
      console.log(error);
    });
  }

  onSubmit() {
    const form = this.loginForm.value;
    this.auth.loginWithEmailAndPassword(form.email, form.password).catch(error => {
      console.log(error);
    });
  }
}
