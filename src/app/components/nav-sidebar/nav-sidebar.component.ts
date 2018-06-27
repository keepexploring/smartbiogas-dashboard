import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-nav-sidebar',
  templateUrl: './nav-sidebar.component.html',
  styleUrls: ['./nav-sidebar.component.sass'],
})
export class NavSidebarComponent implements OnInit {
  @Input() isAuthenticated: boolean;

  ngOnInit() {}
}
