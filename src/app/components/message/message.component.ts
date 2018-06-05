import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Message } from '../../models/message';
import { MessageService } from '../../services/message.service';
import { Observable, Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.sass'],
})
export class MessageComponent implements OnInit, OnDestroy {
  @Input() message: Message;
  @Input() index: number;

  constructor(private messageService: MessageService) {}

  ticks: number = 0;

  private timer: Observable<number>;
  private timerSubscription: Subscription;

  ngOnInit() {
    this.timer = timer(1000, 1000);
    this.timerSubscription = this.timer.subscribe(t => {
      this.ticker(t);
    });
  }

  ticker(tick: number): void {
    this.ticks = tick;
    if (this.ticks === 4) {
      this.destroyMessage();
    }
  }

  ngOnDestroy() {
    this.timerSubscription.unsubscribe();
  }

  destroyMessage(): void {
    this.messageService.destroy(this.index);
    this.timerSubscription.unsubscribe();
  }
}
