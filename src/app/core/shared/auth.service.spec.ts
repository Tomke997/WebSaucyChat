import {TestBed} from '@angular/core/testing';
import {AuthService} from './auth.service';
import {AngularFirestore, AngularFirestoreModule} from "@angular/fire/firestore";
import {AngularFireAuth, AngularFireAuthModule,} from "@angular/fire/auth";
import {LoggerService} from "./logger.service";
import {RouterTestingModule} from "@angular/router/testing";
import {User} from "../../shared/model/user";
import {of} from "rxjs";

describe('AuthService', () => {
  let angularFirestoreMock: any;
  let fsCollectionMock: any;
  let loggerServiceMock: any;
  let service: AuthService;
  let authMock: any;


  beforeEach(() => {
    loggerServiceMock = jasmine.createSpyObj(['createLogEntry']);
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

    const mockAngularFireAuth: any = {
      auth: jasmine.createSpyObj('auth', {
        'signInAnonymously': Promise.reject({
          code: 'auth/operation-not-allowed'
        }),
        'signInWithEmailAndPassword': of('').toPromise(),
        'signInWithPopup': Promise.reject(),
        'signOut': Promise.reject(),
        'currentUser': Promise.reject()

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
      ],
    });
    service = TestBed.get(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('?should sign in', () => {

    expect(service).toBeTruthy();
  });

  it('?should sign out', () => {

    expect(service).toBeTruthy();
  });

  it('?should remove user', () => {

    expect(service).toBeTruthy();
  });

});

//it should sign in

//it should sign out

//it should update user data

/*
private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private logger: LoggerService
 */
