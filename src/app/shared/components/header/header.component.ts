import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-view-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent implements OnInit {
  @Input() title: string;

  @Input() link1: string;
  @Input() link2: string;
  @Input() link1text: string;
  @Input() link2text: string;

  constructor() {}

  ngOnInit() {}
}
