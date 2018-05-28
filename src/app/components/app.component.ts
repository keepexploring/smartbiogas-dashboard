import { Component, OnInit, OnDestroy } from '@angular/core';

import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

import { MessageService } from '../services/message.service';
import { Message } from '../models/message';
import { ConnectionStatusService } from '../services/connection-status.service';
import { MessageType } from '../enums/message-type';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean = false;
  authenticationSubscription: Subscription;
  connectionSubscription: Subscription;

  isLoading: boolean = true;
  isOnline: boolean = true;

  offlineMessage = new Message(
    'You are offline, no requests will be made to the server',
    MessageType.Danger,
  );
  onlineMessage = new Message('You are back online', MessageType.Success);

  constructor(
    private auth: AuthService,
    private messageService: MessageService,
    private connectionStatusService: ConnectionStatusService,
  ) {}

  ngOnInit() {
    this.isLoading = false;
    this.connectionStatusService.check();
    this.subscribeToAuthStatus();
    this.subscribeToConnectionStatus();
  }

  subscribeToConnectionStatus(): void {
    this.connectionSubscription = this.connectionStatusService.status.subscribe(isOnline => {
      this.isOnline = isOnline;
      console.log('APP isOnline', isOnline);
      if (isOnline) {
        this.auth.validateToken();
      } else {
        this.auth.validatedToken = false;
      }
      const message = isOnline ? this.onlineMessage : this.offlineMessage;
      this.messageService.add(message);
    });
  }

  subscribeToAuthStatus(): void {
    this.authenticationSubscription = this.auth.authChanged.subscribe(authenticated => {
      this.isAuthenticated = authenticated;
    });
  }

  ngOnDestroy() {
    //prevent memory leak when component destroyed
    this.connectionSubscription.unsubscribe();
    this.authenticationSubscription.unsubscribe();
  }
}
