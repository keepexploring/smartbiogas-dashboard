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
    auth.check();
    this.isAuthenticated = auth.authenticated;
    this.authenticationSubscription = auth.authChanged.subscribe(value => {
      this.isAuthenticated = value;
    });
  }

  ngOnInit() {
    console.log('App INIT');
    this.auth.validateToken().subscribe(response => {
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    //prevent memory leak when component destroyed
    this.authenticationSubscription.unsubscribe();
  }
}
