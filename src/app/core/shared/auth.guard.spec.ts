import {inject, TestBed} from '@angular/core/testing';
import {AuthGuard} from './auth.guard';
import {LoggerService} from "./logger.service";
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";

describe('AuthGuard', () => {
  let router: any;
  let authServiceMock: any;
  let authGuard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        {provide: AuthService, useValue: authServiceMock},
        {provide: Router, useValue: router}
      ],
      imports: [RouterTestingModule]

    });
  });

  it('should create', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));

  it('should return true for a logged in user', () => {
    //authServiceMock.user.loggedIn
    //expect(authGuard.canActivate).toEqual(true)
  });

  it('should return false for a logged out user', () => {
    //authServiceMock.user.loggedIn
    //expect(authGuard.canActivate).toEqual(false)
  });
//test routing
});
