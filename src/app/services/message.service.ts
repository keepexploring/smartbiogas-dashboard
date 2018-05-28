import { Injectable } from '@angular/core';
import { Message } from '../models/message';
import { MessageType } from '../enums/message-type';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages: Message[] = [];

  messageSubject: Subject<Message[]> = new Subject<Message[]>();

  constructor() {
    this.messageSubject.next(this.messages);
  }

  add(message: Message) {
    this.messages.push(message);
    this.messageSubject.next(this.messages);
  }

  clear() {
    this.messages = [];
    this.messageSubject.next(this.messages);
  }

  destroy(index: number) {
    if (!this.messages[index]) {
      return;
    }
    this.messages.splice(index, 1);
    this.messageSubject.next(this.messages);
  }

  displayOnlineMessage() {
    this.clear();
    this.add(new Message('You are back online', MessageType.Success));
  }

  displayOfflineMessage() {
    this.clear();
    this.add(
      new Message('You are offline, no requests will be made to the server', MessageType.Danger),
    );
  }
}
