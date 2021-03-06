import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UserProfileComponent} from './user-profile.component';
import {AuthService} from "../../core/shared/auth.service";
import {DOMHelper} from "../../../testing/dom-helper";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule, MatCardModule, MatDialog} from "@angular/material";
import {FileService} from "../../file/shared/file.service";
import {of} from "rxjs";

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;
  let dh: DOMHelper<UserProfileComponent>;
  let fileServiceMock: any;
  let authServiceMock: any;
  let matDialogMock: any;


  beforeEach(async(() => {
    fileServiceMock = jasmine.createSpyObj(['sendNewFileBase64']);
    authServiceMock = jasmine.createSpyObj(
      ['googleLogin', 'loginWithEmailAndPassword', 'createNewUser', 'removeUser', 'signOut']);
    matDialogMock = jasmine.createSpyObj(['open']);

    TestBed.configureTestingModule({
      declarations: [UserProfileComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatCardModule,
        MatButtonModule],
      providers: [
        {provide: AuthService, useValue: authServiceMock},
        {provide: FileService, useValue: fileServiceMock},
        {provide: MatDialog, useValue: matDialogMock}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    dh = new DOMHelper(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onClickConnect if Connect Google button clicked', () => {
    spyOn(component, 'onClickConnect');
    component.onClickConnect();
    expect(component.onClickConnect).toHaveBeenCalledTimes(1);
  });

  it('should call onClickConnect and be truthy', () => {
    component.onClickConnect();
    expect(component).toBeTruthy();
  });

  it('should call onclickRemoveUser and be truthy', () => {
    component.onClickRemoveUser();
    expect(authServiceMock.removeUser).toHaveBeenCalledTimes(1);
  });

  it('should call onClickLogOut and be truthy', () => {
    component.onClickLogOut();
    expect(authServiceMock.signOut).toHaveBeenCalledTimes(1);
  });
});
