import { Component, OnInit, OnDestroy } from '@angular/core';

import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { MessageService } from '../services/message.service';
import { ConnectionStatusService } from '../services/connection-status.service';

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
        this.messageService.displayOnlineMessage();
      } else {
        this.messageService.displayOnlineMessage();
        this.auth.validatedToken = false;
      }
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
