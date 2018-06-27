import { Injectable } from '@angular/core';
import { Observable, merge, fromEvent, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ConnectionStatusService {
  status: Subject<boolean> = new Subject<boolean>();

  constructor() {
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
