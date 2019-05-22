import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MessageListComponent} from './message-list.component';
import {MessageService} from "../../message/shared/message.service";
import {Observable, of} from "rxjs";
import {Message} from "../../shared/model/message";
import {DOMHelper} from "../../../testing/dom-helper";
import {RouterTestingModule} from "@angular/router/testing";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material";

describe('MessageListComponent', () => {
  let component: MessageListComponent;
  let fixture: ComponentFixture<MessageListComponent>;
  let dh: DOMHelper<MessageListComponent>;
  let messageServiceMock: any;

  beforeEach(async(() => {
    messageServiceMock = jasmine.createSpyObj('MessageService', ['getAllMessages', 'sendNewMessage']);
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

    it('Should be 1 button on the page', () => {
      expect(dh.count('button')).toBe(1);
    });
  });

  it('should call getAllMessages once', () => {
    expect(messageServiceMock.getAllMessages).toHaveBeenCalledTimes(1);
  });

  describe('List Messages', () => {
    let helper: Helper;
    beforeEach(() => {
      helper = new Helper();
      fixture.detectChanges();
    });

    it('Should show no img item when no messages are available', () => {
      expect(dh.count('img')).toBe(0);
    });

    it('should call openDialog if button clicked', () => {
      spyOn(component, 'openDialog');
      dh.clickButton('Image');
      expect(component.openDialog).toHaveBeenCalledTimes(1);
    });

   /* it('List should contain last text', () => {
      component.allMessages$ = helper.getAllMessages(1);
      expect(dh.countText('text', 'Number')).toBe(1);
    });*/

  });

  describe('Call NgOnInit on Demand', () => {
    let helper: Helper;
    beforeEach(() => {
      helper = new Helper();
    });

    it('Should call getAllMessages on the MessageService one time on ngOnInit', () => {
     // fixture.detectChanges();
      expect(messageServiceMock.getAllMessages).toHaveBeenCalledTimes(1);
    });

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
        {id: 'abc' + i, text: 'Number' + i, userId: 'asd' + i, time: new Date()}
      );
    }
    return of(this.messages);
  }
}
