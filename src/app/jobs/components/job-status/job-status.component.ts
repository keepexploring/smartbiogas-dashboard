import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';

@Component({
  selector: 'app-job-status',
  templateUrl: './job-status.component.html',
  styleUrls: ['./job-status.component.sass'],
})
export class JobStatusComponent implements OnInit, OnChanges {
  @Input() status: string;
  @Input() size: string;
  statusStyle: string;

  constructor() {}

  private getStatus() {
    if (this.status) {
      switch (this.status.toLowerCase()) {
        case 'resolving':
          this.statusStyle = 'cyan';
          break;
        case 'flag':
          this.statusStyle = 'red';
          break;
        case 'resolved':
          this.statusStyle = 'green';
          break;
        case 'unassigned':
          this.statusStyle = 'gray';
          break;
        case 'assistance':
          this.statusStyle = 'orange';
          break;
        default:
          this.statusStyle = 'empty';
          this.status = 'Unknown';
          break;
      }
    } else {
      this.statusStyle = 'empty';
      this.status = 'Unknown';
    }
    this.statusStyle = 'status-' + this.statusStyle;
  }

  ngOnInit() {
    this.getStatus();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.status) {
      this.status = changes.status.currentValue;
    }

    if (changes.size) {
      this.size = changes.size.currentValue;
    }

    this.getStatus();
  }
}
