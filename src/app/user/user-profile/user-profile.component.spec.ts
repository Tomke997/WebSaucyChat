import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileComponent } from './user-profile.component';
import {AngularFireAuth, AngularFireAuthModule} from "@angular/fire/auth";
import {of} from "rxjs";
import {AuthService} from "../../core/shared/auth.service";

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProfileComponent ],
      imports: [],
      providers: [
        {provide: AuthService, useClass: AuthServiceStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('service should exist', () => {
    const service: AuthServiceStub = new AuthServiceStub();
    expect(service).toBeTruthy();
  });

});

//on click connect to be called

class AuthServiceStub {
  onClickConnect(){}
}
