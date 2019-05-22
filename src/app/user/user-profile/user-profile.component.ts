import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../core/shared/auth.service";
import {FormGroup} from "@angular/forms";
import {LoggerService} from "../../core/shared/logger.service";



@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  constructor(public auth: AuthService) { }

  ngOnInit() {
  }
  onClickConnect()
  {
    this.auth.googleLogin();
  }

  onClickLogOut()
  {
    this.auth.signOut();
  }

  onClickRemoveUser(){
    this.auth.removeUser();
  }
}
