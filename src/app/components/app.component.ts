import { Component, OnInit, OnChanges, SimpleChange, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit, OnChanges, OnDestroy {

  isAuthenticated = false;
  isLoading = true;
  subscription: Subscription;

  constructor(private auth: AuthService, private dataService: DataService, private router: Router) {}

  logOut() {
    this.auth.logOut();
    this.isAuthenticated = false;
    this.router.navigate(['/login']);
  }

  ngOnInit() {
    this.subscription = this.dataService.getData().subscribe(data => {
      console.log(data);
      this.isAuthenticated = data;
    });

    this.isAuthenticated = this.auth.isAuthenticated();
    this.isLoading = false;
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    console.log(changes);
    this.isAuthenticated = this.auth.isAuthenticated(); 
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
