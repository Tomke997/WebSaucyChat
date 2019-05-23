import { State, Action, StateContext, Selector } from '@ngxs/store';
import {Message} from "../../shared/model/message";
import {
  AddMessage,
  DeleteMessage,
  GetMessages,
  UpdateMessage
} from "../ngxs-actions/message.actions";
import {MessageService} from "../../message/shared/message.service";

export class MessageStateModel {
  messages: Message[];
}

@State<MessageStateModel>({
  name: 'messages',
  defaults: {
    messages: [
      {text: 'test'}
    ],
  }
})

export class MessageState {
  constructor(private messageService: MessageService) {
  }

  @Selector()
  static getMessagesList(state: MessageStateModel) {
    return state.messages
  }

  @Action(GetMessages)
  getMessages({getState, setState}: StateContext<MessageStateModel>, {payload}: GetMessages) {
    return this.messageService.getAllMessages(payload).subscribe(result => {
      const state = getState();
      setState({
        ...state,
        messages: result,
      });
    })
  }

  @Action(AddMessage)
  addMessage({getState, patchState}: StateContext<MessageStateModel>, {payload}: AddMessage) {
    this.messageService.sendNewMessage(payload).subscribe();
  }

  @Action(UpdateMessage)
  updateMessage({getState, setState}: StateContext<MessageStateModel>, {payload, id}: UpdateMessage) {
    this.messageService.updateMessage(payload, id);
  }

  @Action(DeleteMessage)
  deleteMessage({getState, setState}: StateContext<MessageStateModel>, {id}: DeleteMessage) {
    this.messageService.deleteMessage(id);
  }
}
