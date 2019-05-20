import { TestBed } from '@angular/core/testing';

import { LoggerService } from './logger.service';
import {AngularFirestore, AngularFirestoreModule} from "@angular/fire/firestore";
import {Log} from "../../shared/model/log";
import {Message} from "../../shared/model/message";
import {Observable, of} from "rxjs";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {HttpClient, HttpClientModule} from "@angular/common/http";

describe('LoggerService', () => {
  let angularFirestoreMock: any;
 // let fsCollectionMock: any;
  let service: LoggerService;
  let http: HttpClientTestingModule;

  beforeEach(() => {
    angularFirestoreMock = jasmine.createSpyObj('AngularFirestore', ['collection']);
   // fsCollectionMock = jasmine.createSpyObj('collection', ['snapshotChanges', 'valueChanges']);
   // angularFirestoreMock.collection.and.returnValue(fsCollectionMock);

    TestBed.configureTestingModule({
      imports: [AngularFirestoreModule],
      providers: [
        {provide: AngularFirestore, useValue: angularFirestoreMock},
        {provide: HttpClient, useValue: http}
      ]
    });
    service = TestBed.get(LoggerService);
  });

  /*
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  /*
'should create 1 log entry', () => {

      const data: Log = {
        email: 'test',
        timeStamp: 'test',
        ip: 'ip'
      };
     service.createLogEntry(data);
      expect(service.createLogEntry).toHaveBeenCalledTimes(1);
    });*/
//createLogEntry test
});
/*
class Helper {
  logs: Log[] = [];

  getLogEntries(amount: number): Observable<Log[]> {
    for (let i = 0; i < amount; i++) {
      this.logs.push(
        {email: 'abc' + i, timeStamp: 'haa' + i, ip: 'asd' + i}
      );
    }
    return of(this.logs);
  }
}*/
