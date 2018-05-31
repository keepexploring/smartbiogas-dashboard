import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.sass'],
})
export class ProgressBarComponent implements OnInit, OnChanges {
  @Input() current: number;
  @Input() total: number;

  percentage: number;

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
    this.percentage = this.percentage * 100;
  }
}
