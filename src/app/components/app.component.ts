import { Component, OnInit, OnDestroy } from '@angular/core';

import { AuthService } from '../auth/services/auth.service';
import { Subscription } from 'rxjs';
import { MessageService } from '../core/services/message.service';
import { ConnectionStatusService } from '../core/services/connection-status.service';
import { NavigationHistoryService } from '../core/services/navigation-history.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean = false;
  authenticationSubscription: Subscription;
  connectionSubscription: Subscription;
  navigationHistorySubscription: Subscription;

  isLoading: boolean = true;
  isOnline: boolean = true;

  constructor(
    private auth: AuthService,
    private messageService: MessageService,
    private connectionStatusService: ConnectionStatusService,
    private navigationHistoryService: NavigationHistoryService,
  ) {}

  ngOnInit() {
    this.isLoading = false;
    this.subscribeToAuthStatus();
    this.subscribeToConnectionStatus();
    this.subscribeToNavigationHistory();
  }

  subscribeToConnectionStatus(): void {
    this.connectionStatusService.check();
    this.connectionSubscription = this.connectionStatusService.status.subscribe(isOnline => {
      this.isOnline = isOnline;
      console.log('APP isOnline', isOnline);
      if (isOnline) {
        this.auth.validateToken();
        this.messageService.displayOnlineMessage();
      } else {
        this.messageService.displayOfflineMessage();
        this.auth.validatedToken = false;
      }
    });
  }

  subscribeToAuthStatus(): void {
    this.authenticationSubscription = this.auth.authChanged.subscribe(authenticated => {
      this.isAuthenticated = authenticated;
    });
  }

  subscribeToNavigationHistory() {
    this.navigationHistorySubscription = this.navigationHistoryService.get().subscribe();
  }

  ngOnDestroy() {
    //prevent memory leak when component destroyed
    this.connectionSubscription.unsubscribe();
    this.authenticationSubscription.unsubscribe();
    this.navigationHistorySubscription.unsubscribe();
  }
}
