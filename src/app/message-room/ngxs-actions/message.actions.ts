import {Message} from "../../shared/model/message";

export class GetMessages {
  static readonly type = '[Message] Get'

  constructor(public  payload: Message[]) {}
}

export class AddMessage {
  static readonly type = '[Message] Add'

  constructor(public payload: Message) {}
}

export class StopMessage {
  static readonly type = '[Message] Stop'

  constructor() {}
}

export class UpdateMessage {
  static readonly type = '[Message] Update'

  constructor(public payload: Message, public id: string) {}
}

export class DeleteMessage {
  static readonly type = '[Message] Remove'

  constructor(public id: string) {}
}
