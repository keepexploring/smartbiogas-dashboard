import { Component, OnInit } from '@angular/core';
import {
  trigger,
  style,
  transition,
  animate,
  keyframes,
  query,
  stagger,
} from '@angular/animations';

import { MessageService } from '../../core/services/message.service';
import { Message } from '../../models/message';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.sass'],
  animations: [
    trigger('StaggerInOutAnimation', [
      transition('* => *', [
        query(':enter', style({ opacity: 0 }), { optional: true }),
        query(
          ':enter',
          stagger('100ms', [
            animate(
              '0.1s ease-in-out',
              keyframes([
                style({ opacity: 0, transform: 'translateY(-75%)', offset: 0 }),
                style({ opacity: 0.5, transform: 'translateY(35px)', offset: 0.3 }),
                style({ opacity: 1, transform: 'translateY(0)', offset: 1.0 }),
              ]),
            ),
          ]),
          { optional: true },
        ),
        query(
          ':leave',
          animate(
            '0.2s ease-in-out',
            keyframes([
              style({ opacity: 1, transform: 'translateY(0)', offset: 0 }),
              style({ opacity: 0.5, transform: 'translateY(35px)', offset: 0.3 }),
              style({ opacity: 0, transform: 'translateY(-75%)', offset: 1.0 }),
            ]),
          ),
          { optional: true },
        ),
      ]),
    ]),
  ],
})
export class MessagesComponent implements OnInit {
  messages: Message[];

  constructor(public messageService: MessageService) {}

  ngOnInit() {
    this.messageService.messageSubject.subscribe(messages => {
      this.messages = messages;
    });
  }
}
