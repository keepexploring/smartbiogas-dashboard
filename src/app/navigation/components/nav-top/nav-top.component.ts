import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-nav-top',
  templateUrl: './nav-top.component.html',
  styleUrls: ['./nav-top.component.sass'],
})
export class NavTopComponent implements OnInit, OnChanges {
  @Input() isAuthenticated: boolean;
  title: string = 'Test title';

  constructor(private auth: AuthService) {}

  ngOnInit() {}

  logOut() {
    this.auth.logOut();
  }

  ngOnChanges() {}
}
