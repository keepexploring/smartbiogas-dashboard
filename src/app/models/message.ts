import { MessageType } from '../shared/enums/message-type';

export class Message {
  content: string;
  type: MessageType;
  constructor(content: string, type: MessageType) {
    this.content = content;
    this.type = type;
  }
}
