import {getTestBed, TestBed} from '@angular/core/testing';

import {FileService} from './file.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {of} from "rxjs";
import {AngularFireStorage, AngularFireStorageModule} from "@angular/fire/storage";
import {AngularFirestore, AngularFirestoreModule} from "@angular/fire/firestore";
import {AngularFireModule} from "@angular/fire";
import {AngularFireAuthModule} from "@angular/fire/auth";

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
    refMock = jasmine.createSpyObj('ref', ['getDownloadURL']);
    angularFireStorageMock.ref.and.returnValue(refMock);
    refMock.getDownloadURL.and.returnValue(of(''));

    //AngularFirestore mock
    angularFirestoreMock = jasmine.createSpyObj('AngularFirestore', ['collection']);
    angularFirestoreMock.collection.and.returnValue(fsCollectionMock);
    fsCollectionMock = jasmine.createSpyObj('collection', ['snapshotChanges', 'valueChanges']);
    fsCollectionMock.snapshotChanges.and.returnValue(of([]));

    TestBed.configureTestingModule({
      imports: [
        AngularFirestoreModule,
        AngularFireStorageModule,
        AngularFireModule,
        AngularFireAuthModule,
        HttpClientTestingModule],
      providers: [
        {provide: AngularFirestore, useValue: angularFirestoreMock},
        {provide: AngularFireStorage, useValue: angularFireStorageMock}
      ],
    });
    httpMock = getTestBed().get(HttpTestingController);
    service = TestBed.get(FileService);
  });

      it('should be created', () => {
        expect(service).toBeTruthy();
      });/**/
});
