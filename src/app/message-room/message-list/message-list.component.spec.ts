import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MessageListComponent} from './message-list.component';
import {MessageService} from "../../message/shared/message.service";
import {Observable, of} from "rxjs";
import {Message} from "../../shared/model/message";
import {DOMHelper} from "../../../testing/dom-helper";
import {RouterTestingModule} from "@angular/router/testing";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCardModule, MatDialog, MatDialogModule} from "@angular/material";
import {NgxsModule, Store} from "@ngxs/store";
import {FileService} from "../../file/shared/file.service";
import {AuthService} from "../../core/shared/auth.service";
import {MessageState} from "../ngsx-state/message.state";

describe('MessageListComponent', () => {
  let component: MessageListComponent;
  let fixture: ComponentFixture<MessageListComponent>;
  let dh: DOMHelper<MessageListComponent>;
  let messageServiceMock: any;
  let fileServiceMock: any;
  let matDialogMock: any;
  let store: Store;

  beforeEach(async(() => {

    fileServiceMock = jasmine.createSpyObj('FileService', ['']);
    matDialogMock = jasmine.createSpyObj('MatDialog', ['']);
    messageServiceMock = jasmine.createSpyObj('MessageService', ['getAllMessages']);
    messageServiceMock.getAllMessages.and.returnValue(of([]));


    TestBed.configureTestingModule({
      declarations: [MessageListComponent],
      imports: [RouterTestingModule,
        ReactiveFormsModule,
        FormsModule,
        MatDialogModule,
        MatCardModule,
        NgxsModule.forRoot([MessageState])],
      providers: [
        {provide: MessageService, useValue: messageServiceMock},
        {provide: MatDialog, useValue: matDialogMock},
        {provide: FileService, useValue: fileServiceMock},
        {provide: AuthService, useClass: authStub}
      ]
    })
      .compileComponents();
    store = TestBed.get(Store);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageListComponent);
    component = fixture.componentInstance;
    dh = new DOMHelper(fixture);


    fixture.detectChanges();
  });

  describe('Simple HTML Tests', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('Should be 1 buttons on the page', () => {
      expect(dh.count('button')).toBe(3);
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
  });
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

class authStub {
  getCurrentUserId() {
  }
}
