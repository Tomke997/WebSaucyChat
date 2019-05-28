import {inject, TestBed} from '@angular/core/testing';
import {AuthGuard} from './auth.guard';
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
});

