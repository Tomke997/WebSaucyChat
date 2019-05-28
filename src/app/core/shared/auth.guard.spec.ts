import {inject, TestBed} from '@angular/core/testing';
import {AuthGuard} from './auth.guard';
import {LoggerService} from "./logger.service";
import {AuthService} from "./auth.service";
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import {of} from "rxjs";

describe('AuthGuard', () => {
  let router: any;
  let authServiceMock: any;
  let guard: AuthGuard;

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        {provide: AuthService, useValue: authServiceMock},
        {provide: Router, useValue: router}
      ],
      imports: [RouterTestingModule]

    });
    guard = TestBed.get(AuthGuard);
  });

  it('should create', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));

});

