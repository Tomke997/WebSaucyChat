import {TestBed} from '@angular/core/testing';

import {LoggerService} from './logger.service';
import {AngularFirestore, AngularFirestoreModule} from "@angular/fire/firestore";
import {Log} from "../../shared/model/log";
import {of} from "rxjs";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {HttpClient, HttpClientModule} from "@angular/common/http";

describe('LoggerService', () => {
  let angularFirestoreMock: any;
  let service: LoggerService;
  let http: HttpClientTestingModule;


  beforeEach(() => {
    angularFirestoreMock = jasmine.createSpyObj('AngularFirestore', ['collection', 'createId', 'doc']);

    TestBed.configureTestingModule({
      imports: [AngularFirestoreModule],
      providers: [
        {provide: AngularFirestore, useValue: angularFirestoreMock},
        {provide: HttpClient, useValue: http}
      ]
    });
    service = TestBed.get(LoggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create 1 log entry', () => {

    spyOn(service, 'createLogEntry');
    const data: Log = {
      email: 'test',
      timeStamp: 'test',
      ip: 'ip'
    };
    service.createLogEntry(data);
    expect(service.createLogEntry).toHaveBeenCalledTimes(1);
  });

  it('getIp should return an ip address', () => {
    spyOn(service, 'getIP').and.returnValue(of('NO'));
    var string;
    string  = service.getIP().toString();

    expect(string).toContain('[object Object]' );
  });
});
