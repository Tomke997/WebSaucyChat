import {TestBed} from '@angular/core/testing';
import {AuthService} from './auth.service';
import {AngularFirestore, AngularFirestoreModule} from "@angular/fire/firestore";
import {AngularFireAuth, AngularFireAuthModule,} from "@angular/fire/auth";
import {LoggerService} from "./logger.service";
import {RouterTestingModule} from "@angular/router/testing";
import {User} from "../../shared/model/user";
import {of} from "rxjs";
import {FileService} from "../../file/shared/file.service";
import {auth} from "firebase";

describe('AuthService', () => {
  let angularFirestoreMock: any;
  let fsCollectionMock: any;
  let loggerServiceMock: any;
  let fileServiceMock: any;
  let service: AuthService;
  let authMock: any;
  let mockAngularFireAuth: any;


  beforeEach(() => {
    loggerServiceMock = jasmine.createSpyObj(['createLogEntry']);
    fileServiceMock = jasmine.createSpyObj(['getProfilePictureUrl']);
    angularFirestoreMock = jasmine.createSpyObj('AngularFirestore', ['collection']);
    authMock = jasmine.createSpyObj('AuthMock', ['signInWithEmailAndPassword']);
    fsCollectionMock = jasmine.createSpyObj('collection', ['snapshotChanges', 'valueChanges']);
    fsCollectionMock.snapshotChanges.and.returnValue(of([]));
    angularFirestoreMock.collection.and.returnValue(fsCollectionMock);

    // An anonymous user
    const authState: User = {
      displayName: 'ost',
      email: 'ost@ost.dk'
    };
     mockAngularFireAuth = {
      auth: jasmine.createSpyObj('auth', {
        'signInAnonymously': Promise.reject({
          code: 'auth/operation-not-allowed'
        }),
        'signInWithEmailAndPassword': of('').toPromise(),
        'oAuthLogin': of('').toPromise(),
        'signInWithPopup': of('').toPromise(),
        'signOut': Promise.reject(),
        'currentUser': of('').toPromise(),
        'authState': true
      }),
      authState: of(authState)
    };

    TestBed.configureTestingModule({
      imports: [
        AngularFirestoreModule,
        AngularFireAuthModule,
        RouterTestingModule,
      ],
      providers: [
        {provide: AngularFirestore, useValue: angularFirestoreMock},
        {provide: AngularFireAuth, useValue: mockAngularFireAuth},
        {provide: LoggerService, useValue: loggerServiceMock},
        {provide: FileService, useValue: fileServiceMock}

      ],
    });
    service = TestBed.get(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should sign in', () => {
    spyOn(service, 'googleLogin');
    service.googleLogin();
    expect(service.googleLogin).toHaveBeenCalledTimes(1);
  });

  it('should be signed in', () => {
    spyOn(service, 'googleLogin');
    service.googleLogin();

    expect(service.user).toBeTruthy();
  });

  it('should sign out', () => {
    spyOn(service, 'signOut');
    service.signOut();
    expect(service.signOut).toHaveBeenCalledTimes(1);
  });

  it('should remove user', () => {
    spyOn(service, 'removeUser');
    service.removeUser();
    expect(service.removeUser).toHaveBeenCalledTimes(1);
  });

  it('should call googleLogin and be truthy', () => {
    service.googleLogin();
    expect(service).toBeTruthy();
  });

  it('should call oAuthLogin and be truthy', () => {
    service.oAuthLogin(new auth.GoogleAuthProvider());
    expect(service).toBeTruthy();
  });

  it('should call getCurrentUserId and be truthy', () => {
    service.getCurrentUserId();
    expect(service).toBeTruthy();
  });
});
