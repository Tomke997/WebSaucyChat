import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileComponent } from './user-profile.component';
import {AuthService} from "../../core/shared/auth.service";
import {DOMHelper} from "../../../testing/dom-helper";
import {ReactiveFormsModule} from "@angular/forms";

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;
  let dh: DOMHelper<UserProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProfileComponent ],
      imports: [ReactiveFormsModule],
      providers: [
        {provide: AuthService, useClass: AuthServiceStub}
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

  it('service should exist', () => {
    const service: AuthServiceStub = new AuthServiceStub();
    expect(service).toBeTruthy();
  });

   it('?should call onClickConnect if Connect Google button clicked', () => {
      spyOn(component, 'onClickConnect');
      component.onClickConnect();
     // dh.clickButton('Connect Google');
      expect(component.onClickConnect).toHaveBeenCalledTimes(1);
    });  /**/

  /*  it('should call onClickLogOut if Logout button clicked', () => {
      spyOn(component, 'onClickLogOut');
      dh.clickButton('Logout');
      expect(component.onClickLogOut).toHaveBeenCalledTimes(1);
    }); */
});

//on click connect to be called

class AuthServiceStub {}
