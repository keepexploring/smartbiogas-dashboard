import { Component, OnInit, OnDestroy } from '@angular/core';

import { AuthService } from '../services/auth.service';
import { Subject, Subscription } from 'rxjs';
import { MessageService } from '../services/message.service';
import { Message } from '../models/message';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean = false;
  authenticationSubscription: Subscription;
  isLoading: boolean = true;

  constructor(private auth: AuthService, private messageService: MessageService) {
    this.isAuthenticated = auth.authenticated;
  }

  ngOnInit() {
    this.isLoading = false;
    this.auth.validateToken();

    this.authenticationSubscription = this.auth.authChanged.subscribe(authenticated => {
      this.isAuthenticated = authenticated;
    });
  }

  ngOnDestroy() {
    //prevent memory leak when component destroyed
    this.authenticationSubscription.unsubscribe();
  }

  addMessage(message: Message) {
    this.messageService.add(message);
    console.log('messages');
  }
}
