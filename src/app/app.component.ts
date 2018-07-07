import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { Subscription } from 'rxjs';
import { MessageService } from './core/services/message.service';
import { ConnectionStatusService } from './core/services/connection-status.service';
import { NavigationHistoryService } from './core/services/navigation-history.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean = false;
  subscriptions: Subscription[] = [];
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
    const sub = this.connectionStatusService.status.subscribe(isOnline => {
      this.isOnline = isOnline;
      if (isOnline) {
        this.auth.validateToken();
        this.messageService.displayOnlineMessage();
      } else {
        this.messageService.displayOfflineMessage();
        this.auth.validatedToken = false;
      }
    });
    this.subscriptions.push(sub);
  }

  subscribeToAuthStatus(): void {
    const sub = this.auth.authChanged.subscribe(authenticated => {
      this.isAuthenticated = authenticated;
    });
    this.subscriptions.push(sub);
  }

  subscribeToNavigationHistory() {
    this.subscriptions.push(this.navigationHistoryService.get().subscribe());
  }

  ngOnDestroy() {
    for (let index = 0; index < this.subscriptions.length; index++) {
      this.subscriptions[index].unsubscribe();
    }
  }
}
