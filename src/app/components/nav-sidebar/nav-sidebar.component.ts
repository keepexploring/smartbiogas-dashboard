import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nav-sidebar',
  templateUrl: './nav-sidebar.component.html',
  styleUrls: ['./nav-sidebar.component.sass'],
})
export class NavSidebarComponent implements OnInit, OnChanges {
  @Input() isAuthenticated: boolean;

  ngOnInit() {
    // console.log('NavSidebarComponent INIT', this.isAuthenticated);
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log('NavSidebarComponent CHANGES', changes, this.isAuthenticated);
  }
}
