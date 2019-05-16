import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import {AngularFirestore, AngularFirestoreModule} from "@angular/fire/firestore";
import {AngularFireAuth, } from "@angular/fire/auth";
import {LoggerService} from "./logger.service";

describe('AuthService', () => {
let angularFireAuthMock: any;
let angularFirestoreMock: any;
let loggerServiceMock: any;
let service: AuthService;


  beforeEach(() =>{
  angularFirestoreMock = jasmine.createSpyObj('AngularFirestore', ['collection']);

   TestBed.configureTestingModule({
     imports: [
       AngularFirestoreModule
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
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  }); */

});



/*
private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private logger: LoggerService
 */
