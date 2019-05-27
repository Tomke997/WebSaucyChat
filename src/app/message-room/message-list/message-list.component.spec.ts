import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MessageListComponent} from './message-list.component';
import {MessageService} from "../../message/shared/message.service";
import {Observable, of} from "rxjs";
import {Message} from "../../shared/model/message";
import {DOMHelper} from "../../../testing/dom-helper";
import {RouterTestingModule} from "@angular/router/testing";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material";
import {AngularFireStorage, AngularFireStorageModule} from "@angular/fire/storage";
import {AngularFirestore} from "@angular/fire/firestore";
import {User} from "../../shared/model/user";
import {AngularFireAuth} from "@angular/fire/auth";
import {Store} from "@ngxs/store";
import { provideMockStore } from '@ngrx/store/testing';

describe('MessageListComponent', () => {
  let component: MessageListComponent;
  let fixture: ComponentFixture<MessageListComponent>;
  let dh: DOMHelper<MessageListComponent>;
  let messageServiceMock: any;
  let angularFirestoreMock: any;
  let angularFireStorageMock: any;
  let fsCollectionMock: any;
  let refMock;
  //let store: MockStore<{ loggedIn: boolean }>;
  //const initialState = { loggedIn: false };

 // let store: Store<fromFeature.State>;

  beforeEach(async(() => {

    //store = TestBed.get(Store);

    //spyOn(store, 'dispatch').and.callThrough();

    messageServiceMock = jasmine.createSpyObj('MessageService', ['getAllMessages']);
    messageServiceMock.getAllMessages.and.returnValue(of([]));

    //AngularFirestore mock
    angularFirestoreMock = jasmine.createSpyObj('AngularFirestore', ['collection', 'createId']);//create id just added
    angularFirestoreMock.collection.and.returnValue(fsCollectionMock);
    fsCollectionMock = jasmine.createSpyObj('collection', ['snapshotChanges', 'valueChanges']);
    fsCollectionMock.snapshotChanges.and.returnValue(of([]));

    // angularFireStorage mock
    angularFireStorageMock = jasmine.createSpyObj('AngularFireStorage', ['ref']);
    refMock = jasmine.createSpyObj('ref', ['getDownloadURL', 'putString']); //putstring just added
    angularFireStorageMock.ref.and.returnValue(refMock);
    refMock.getDownloadURL.and.returnValue(of(''));

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
        'currentUser': Promise.reject()
        //'authState': true
      }),
      authState: of(authState)
    };



    TestBed.configureTestingModule({
      declarations: [MessageListComponent],
      imports: [RouterTestingModule,
        ReactiveFormsModule,
        FormsModule,
        MatDialogModule],
      providers: [
       // provideMockStore({ initialState }),
        {provide: MessageService, useValue: messageServiceMock},
        {provide: AngularFirestore, useValue: angularFirestoreMock},
        {provide: AngularFireStorage, useValue: angularFireStorageMock},
        {provide: AngularFireAuth, useValue: mockAngularFireAuth}
        ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageListComponent);
    component = fixture.componentInstance;
    dh = new DOMHelper(fixture);

   // store = TestBed.get(Store);
    fixture.detectChanges();
  });

  describe('Simple HTML Tests', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });
    /*
            it('should create', () => {
              expect(component).toBeTruthy();
        });
    
        /*
            //WHY 1 BUTTON?!??!?!
            it('Should be 1 buttons on the page', () => {
              expect(dh.count('button')).toBe(1);
            });

          });

          it('should call getAllMessages once', () => {
            fixture.detectChanges();
            expect(messageServiceMock.getAllMessages).toHaveBeenCalledTimes(1);
          });

          describe('List Products', () => {
            let helper: Helper;
            beforeEach(() => {
              helper = new Helper();
              fixture.detectChanges();
            });

        */
  });

//test to do:

  //click send, sends message

  //click send image, sends image
});

class Helper {
  messages: Message[] = [];

  getAllMessages(amount: number): Observable<Message[]> {
    for (let i = 0; i < amount; i++) {
      this.messages.push(
        {id: 'abc' + i, text: 'haa' + i, userId: 'asd' + i, time: new Date()}
      );
    }
    return of(this.messages);
  }
}


/*
class MockStore<T> extends Store {
  scannedActions$: Observable<Action>
  setState(nextState: T): void
  addReducer()
  removeReducer()

  // inherited from store/Store
  select<Props = any>(pathOrMapFn: string | ((state: T, props?: Props) => any), ...paths: string[]): Observable<any>
  lift<R>(operator: Operator<T, R>): Store<R>
  dispatch<V extends Action = Action>(action: V)
  next(action: Action)
  error(err: any)
  complete()
  addReducer<State, Actions extends Action = Action>(key: string, reducer: ActionReducer<State, Actions>)
  removeReducer<Key extends Extract<keyof T, string>>(key: Key)
}*/

