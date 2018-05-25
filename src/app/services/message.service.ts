import { Injectable } from '@angular/core';
import { Message } from '../models/message';
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
}
