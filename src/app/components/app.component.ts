import { Component, OnInit, OnDestroy } from '@angular/core';

import { AuthService } from '../services/auth.service';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean = false;
  authenticationSubscription: Subscription;
  isLoading: boolean = true;

  constructor(private auth: AuthService) {
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
}
