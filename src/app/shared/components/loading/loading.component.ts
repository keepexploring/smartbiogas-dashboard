import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.sass'],
})
export class LoadingComponent implements OnInit {
  @Input() hideText: boolean = false;
  @Input() text: string = 'Loading';
  @Input() color: string;

  constructor() {}

  ngOnInit() {}
}
