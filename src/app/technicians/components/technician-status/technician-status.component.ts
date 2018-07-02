import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-technician-status',
  templateUrl: './technician-status.component.html',
  styleUrls: ['./technician-status.component.sass'],
})
export class TechnicianStatusComponent implements OnInit, OnChanges {
  @Input() status: boolean = false;
  @Input() size: string = 'small';
  statusState: boolean = false;
  statusText: string = 'Active';
  constructor() {}
  ngOnInit() {
    this.getStatus();
  }

  private getStatus() {
    if (this.status === null || this.status === undefined) {
      this.statusText = 'Unknown';
      this.statusState = null;
    } else {
      this.statusState = this.status;
      if (status) {
        this.statusText = 'Active';
      } else {
        this.statusText = 'Inactive';
      }
    }
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
