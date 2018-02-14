import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-job-status',
  templateUrl: './job-status.component.html',
  styleUrls: ['./job-status.component.sass']
})
export class JobStatusComponent implements OnInit {
  @Input() status: string;
  @Input() size: string;

  constructor() { }

  ngOnInit() {
    console.log(this.status);
  }

}
