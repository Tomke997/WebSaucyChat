import {getTestBed, TestBed} from '@angular/core/testing';

import {MessageService} from './message.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {AngularFirestore, AngularFirestoreModule} from "@angular/fire/firestore";
import {FileService} from "../../file/shared/file.service";
import {of} from "rxjs";

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
    //fsCollectionMock.snapshptChanges.and.returnValue(of([])); //not working?
    fileServiceMock = jasmine.createSpyObj('FileService', ['getPictureUrl', 'upload']);

    TestBed.configureTestingModule({
      imports: [
        AngularFirestoreModule,
        HttpClientTestingModule
      ],
      providers: [
        {provide: AngularFirestore, useValue: angularFirestoreMock},
        {provide: FileService, useValue: angularFirestoreMock},
      ],
    });
    httpMock = getTestBed().get(HttpTestingController);
    service = TestBed.get(MessageService);
  });

   it('should be created', () => {
     expect(service).toBeTruthy();
   });

   describe('getMessageCalls', () => {
     beforeEach(() => {
     service.getAllMessages();
   });
     /*
     it('should call collection 1 time on AngularFirestore service', function () {
       expect(angularFirestoreMock.collection).toHaveBeenCalledTimes(1);
     });*/

   });
});
