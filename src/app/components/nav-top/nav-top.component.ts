import { Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ConnectionStatusService } from '../../services/connection-status.service';

@Component({
  selector: 'app-nav-top',
  templateUrl: './nav-top.component.html',
  styleUrls: ['./nav-top.component.sass'],
})
export class NavTopComponent implements OnInit, OnChanges {
  @Input() isAuthenticated: boolean;

  constructor(private auth: AuthService) {}

  ngOnInit() {
    // console.log('NavTopComponent INIT', this.isAuthenticated);
  }

  logOut() {
    this.auth.logOut();
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log('NavTopComponent', changes, this.isAuthenticated);
  }
}
