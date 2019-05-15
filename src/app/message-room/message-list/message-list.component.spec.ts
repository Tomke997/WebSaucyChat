import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MessageListComponent} from './message-list.component';
import {DebugElement} from "@angular/core";
import {MessageService} from "../../message/shared/message.service";
import {Observable, of} from "rxjs";
import {Message} from "../../shared/model/message";
import {environment} from "../../../environments/environment";
import {DOMHelper} from "../../../testing/dom-helper";
import {RouterTestingModule} from "@angular/router/testing";
import {getLocaleTimeFormat} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDialog, MatDialogModule} from "@angular/material";

describe('MessageListComponent', () => {
  let component: MessageListComponent;
  let fixture: ComponentFixture<MessageListComponent>;
  let dh: DOMHelper<MessageListComponent>;
  let messageServiceMock: any;

  beforeEach(async(() => {
    messageServiceMock = jasmine.createSpyObj('MessageService', ['getAllMessages']);
    messageServiceMock.getAllMessages.and.returnValue(of([]));
    TestBed.configureTestingModule({
      declarations: [MessageListComponent],
      imports: [RouterTestingModule, ReactiveFormsModule, FormsModule, MatDialogModule],
      providers: [{provide: MessageService, useValue: messageServiceMock}]
    })
      .compileComponents();
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
  });

    it('should call getAllMessages once', () => {
      fixture.detectChanges();
      expect(messageServiceMock.getAllMessages).toHaveBeenCalledTimes(1);
    });

});

class Helper {
  messages: Message[] = [];

  getAllMessages(amount: number): Observable<Message[]> {
    for (let i = 0; i < amount; i++) {
      this.messages.push(
          {id: 'abc' + i, text: 'haa', userId: 'asd', time: new Date() }
        // insert message stuff
      );
    }
    return of(this.messages);
  }
}

/*
export interface Message {
  id?: string;
  text: string;
  userId: string;
  imageId?: string;
  time: Date;
  pictureUri?: string,
  userPicture?: string
 */
