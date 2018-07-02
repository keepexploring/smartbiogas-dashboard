import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-view-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent implements OnInit {
  @Input() title: string;

  constructor() {}

  ngOnInit() {}
}
