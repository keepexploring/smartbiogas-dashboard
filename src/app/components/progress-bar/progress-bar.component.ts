import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.sass'],
})
export class ProgressBarComponent implements OnInit, OnChanges {
  @Input() current: number;
  @Input() total: number;

  percentage: number;
  updated: moment.Moment;
  status: string = 'Loading';

  constructor() {}

  ngOnInit() {
    this.calculatePercentage(this.current, this.total);
  }

  ngOnChanges(changes: SimpleChanges) {
    const current = changes.current ? changes.current.currentValue : this.current;
    const total = changes.total ? changes.total.currentValue : this.total;

    this.calculatePercentage(current, total);
  }

  private calculatePercentage(current: number, total: number): void {
    this.percentage = this.current / this.total;
    this.percentage = Math.round(this.percentage * 100);
    this.getDate();
  }

  getDate() {
    if (this.percentage === 100) {
      this.updated = moment();
      this.status = 'Updated' + this.updated.fromNow();
    } else {
      this.status = 'Loading';
    }
  }
}
