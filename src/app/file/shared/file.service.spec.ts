import {getTestBed, TestBed} from '@angular/core/testing';

import {FileService} from './file.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {of} from "rxjs";
import {AngularFireStorage, AngularFireStorageModule} from "@angular/fire/storage";
import {AngularFirestore, AngularFirestoreModule} from "@angular/fire/firestore";
import {AngularFireModule} from "@angular/fire";
import {AngularFireAuth, AngularFireAuthModule} from "@angular/fire/auth";
import {User} from "../../shared/model/user";

describe('FileService', () => {
  let angularFirestoreMock: any;
  let angularFireStorageMock: any;
  let fsCollectionMock: any;
  let httpMock: HttpTestingController;
  let service: FileService;
  let refMock;

  beforeEach(() => {
    // angularFireStorage mock
    angularFireStorageMock = jasmine.createSpyObj('AngularFireStorage', ['ref']);
    refMock = jasmine.createSpyObj('ref', ['getDownloadURL', 'putString']); //putstring just added
    angularFireStorageMock.ref.and.returnValue(refMock);
    refMock.getDownloadURL.and.returnValue(of(''));

    //AngularFirestore mock
    angularFirestoreMock = jasmine.createSpyObj('AngularFirestore', ['collection', 'createId']);//create id just added
    angularFirestoreMock.collection.and.returnValue(fsCollectionMock);
    fsCollectionMock = jasmine.createSpyObj('collection', ['snapshotChanges', 'valueChanges']);
    fsCollectionMock.snapshotChanges.and.returnValue(of([]));

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
        'signInWithPopup': of('').toPromise(),
        'signOut': Promise.reject(),
        'currentUser': Promise.resolve('userId')
        //'authState': true
      }),
      authState: of(authState)
    };

    TestBed.configureTestingModule({
      imports: [
        AngularFirestoreModule,
        AngularFireStorageModule,
        AngularFireModule,
        AngularFireAuthModule,
        HttpClientTestingModule],
      providers: [
        {provide: AngularFirestore, useValue: angularFirestoreMock},
        {provide: AngularFireStorage, useValue: angularFireStorageMock},
        {provide: AngularFireAuth, useValue: mockAngularFireAuth}
      ],
    });
    httpMock = getTestBed().get(HttpTestingController);
    service = TestBed.get(FileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getPictureUrl when we call it', () => {
    spyOn(service, 'getPictureUrl');
    service.getPictureUrl('s');
    expect(service.getPictureUrl).toHaveBeenCalledTimes(1);
  });

  it('should call sendNewFileBase64 when we call it', () => {
    spyOn(service, 'sendNewFileBase64');
    service.sendNewFileBase64('s', 's');
    expect(service.sendNewFileBase64).toHaveBeenCalledTimes(1);
  });

});
