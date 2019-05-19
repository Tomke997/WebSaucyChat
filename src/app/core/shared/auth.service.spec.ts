import {TestBed} from '@angular/core/testing';
import {AuthService} from './auth.service';
import {AngularFirestore, AngularFirestoreModule} from "@angular/fire/firestore";
import {AngularFireAuth, AngularFireAuthModule,} from "@angular/fire/auth";
import {LoggerService} from "./logger.service";
import {Observable, of} from "rxjs";
import {RouterTestingModule} from "@angular/router/testing";
import {AngularFireModule} from "@angular/fire";
import {environment} from "../../../environments/environment.prod";

describe('AuthService', () => {
  let angularFireAuthMock: any;
  let angularFirestoreMock: any;
  let fsCollectionMock: any;
  let loggerServiceMock: any;
  let service: AuthService;

  beforeEach(() => {
    loggerServiceMock = jasmine.createSpyObj(['createLogEntry']);
    angularFirestoreMock = jasmine.createSpyObj('AngularFirestore', ['collection']);
    fsCollectionMock = jasmine.createSpyObj('collection', ['snapshotChanges', 'valueChanges']);

    angularFireAuthMock = jasmine.createSpyObj('AngularFireAuth', ['authState']);
    //angularFireAuthMock.authState.and.returnValue(of([]));
    angularFireAuthMock.auth = {currentUser: true};
    angularFireAuthMock.auth = {
      currentUser: true, signInWithEmailAndPassword: function () {
      }
    };
    angularFireAuthMock.auth.signInWithEmailAndPassword.and.returnValue(of('').toPromise());

    angularFirestoreMock.collection.and.returnValue(fsCollectionMock);
    fsCollectionMock.snapshotChanges.and.returnValue(of([]));

    TestBed.configureTestingModule({
      imports: [
        AngularFirestoreModule,
        AngularFireAuthModule,
        RouterTestingModule,
      ],
      providers: [
        {provide: AngularFirestore, useValue: angularFirestoreMock},
        {provide: AngularFireAuth, useValue: angularFireAuthMock},
        {provide: LoggerService, useValue: loggerServiceMock},
      ],
    });

    service = TestBed.get(AuthService);
  });
  /*
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
    */
});


/*
private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private logger: LoggerService
 */
