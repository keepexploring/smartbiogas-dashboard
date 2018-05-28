import { Injectable } from '@angular/core';
import { Observable, merge, fromEvent, Subscription, Subject, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Message } from '../models/message';
import { MessageService } from './message.service';
import { MessageType } from '../enums/message-type';

@Injectable({
  providedIn: 'root',
})
export class ConnectionStatusService {
  status: Subject<boolean> = new Subject<boolean>();

  constructor(private messageService: MessageService) {
    this.status.next(true);
  }

  check(): void {
    merge(
      fromEvent(window, 'offline').pipe(map(() => false)),
      fromEvent(window, 'online').pipe(map(() => true)),
      Observable.create(sub => {
        sub.next(navigator.onLine);
        sub.complete();
      }),
    ).subscribe(isOnline => {
      this.status.next(isOnline);
    });
  }
}
