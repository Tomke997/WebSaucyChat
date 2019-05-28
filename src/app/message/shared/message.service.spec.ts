import {getTestBed, TestBed} from '@angular/core/testing';

import {MessageService} from './message.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {AngularFirestore, AngularFirestoreModule} from "@angular/fire/firestore";
import {FileService} from "../../file/shared/file.service";
import {Observable, of} from "rxjs";
import {User} from "../../shared/model/user";
import {AngularFireAuth} from "@angular/fire/auth";
import {AppRoutingModule} from "../../app-routing.module";
import {RouterTestingModule} from "@angular/router/testing";
import {Message} from "../../shared/model/message";

describe('MessageService', () => {
  let angularFirestoreMock: any;
  let fileServiceMock: any;
  let fsCollectionMock: any;
  let httpMock: HttpTestingController;
  let service: MessageService;

  beforeEach(() => {
    angularFirestoreMock = jasmine.createSpyObj('AngularFirestore', ['collection']);
    fsCollectionMock = jasmine.createSpyObj('collection', ['snapshotChanges', 'valueChanges']);
    angularFirestoreMock.collection.and.returnValue(fsCollectionMock);
    fsCollectionMock.snapshotChanges.and.returnValue(of([]));
    fileServiceMock = jasmine.createSpyObj('FileService', ['getPictureUrl', 'upload']);

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
        HttpClientTestingModule,
        RouterTestingModule //Not using routing anywhere, why do I need it?
      ],
      providers: [
        {provide: AngularFirestore, useValue: angularFirestoreMock},
        {provide: FileService, useValue: fileServiceMock},
        {provide: AngularFireAuth, useValue: mockAngularFireAuth},
      ],
    });
    httpMock = getTestBed().get(HttpTestingController);
    service = TestBed.get(MessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getMessageCalls x times', () => {
    beforeEach(() => {
      service.getAllMessages();
    });

    it('should call collection 1 time on AngularFirestore service', function () {
      expect(angularFirestoreMock.collection).toHaveBeenCalledTimes(1);
    });

    it('should call collection with "messages" as param', () => {
      expect(angularFirestoreMock.collection).toHaveBeenCalledWith('messages');
    });

    it('should call snapshotChanges 1 time on AngularFirestore service', () => {
      expect(fsCollectionMock.snapshotChanges).toHaveBeenCalledTimes(1);
    });
  });

  describe('Should be truthy', () => {
    beforeEach(() => {
    });

    it('should call getAllMessages ', () => {
      service.getAllMessages();
      expect(service).toBeTruthy();
    });

    it('should call createNewMessage ', () => {
      service.createNewMessage('message');
      expect(service).toBeTruthy();
    });

    it('should call checkObjectInArray ', () => {
      const array = [];
      service.checkObjectInArray(array, 'hi');
      expect(service).toBeTruthy();
    });

    it('should call update message', () => {
      service.updateMessage('Message', 'id');
      expect(service).toBeTruthy();
    });

    it('should delete message', () => {
      service.deleteMessage('id');
      expect(service).toBeTruthy();
    });
  });

  it('getAllMessages should be called', () => {
    spyOn(service, 'getAllMessages');
    service.getAllMessages();
    expect(service.getAllMessages).toHaveBeenCalledTimes(1);
  });


});
