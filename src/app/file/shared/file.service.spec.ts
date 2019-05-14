import {getTestBed, TestBed} from '@angular/core/testing';

import { FileService } from './file.service';
import {HttpTestingController} from "@angular/common/http/testing";
import {of} from "rxjs";

describe('FileService', () => {
  let angularFirestoreMock: any;
  let fileServiceMock: any;
  let fsCollectionMock: any;
  let httpMock: HttpTestingController;
  let service: FileService;

  beforeEach(() => {
    angularFirestoreMock = jasmine.createSpyObj('AngularFirestore', ['collection']);
    fsCollectionMock = jasmine.createSpyObj('collection', ['snapshotChanges', 'valueChanges']);
    angularFirestoreMock.collection.and.returnValue(fsCollectionMock);
    fsCollectionMock.snapshotChanges.and.returnValue(of([]));
    fileServiceMock = jasmine.createSpyObj('FileService', ['getFileUrl', 'upload']);

    TestBed.configureTestingModule({
      imports: [],
      providers: [],
      declarations: []
    });
    httpMock = getTestBed().get(HttpTestingController);
    service = TestBed.get(FileService);

  });

  /*it('should be created', () => {
    const service: FileService = TestBed.get(FileService);
    expect(service).toBeTruthy();
  });*/
});
