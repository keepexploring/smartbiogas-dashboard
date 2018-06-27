import {
  Component,
  OnInit,
  OnChanges,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-header-loading',
  templateUrl: './header-loading.component.html',
  styleUrls: ['./header-loading.component.sass'],
})
export class HeaderLoadingComponent implements OnInit, OnChanges {
  @Output() refresh: EventEmitter<any> = new EventEmitter<any>();
  @Output() fetch: EventEmitter<any> = new EventEmitter<any>();

  @Input() loading: boolean;
  @Input() loadingMeta: boolean;

  @Input() count: number;
  @Input() total: number;

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.loading) {
      this.loading = changes.loading.currentValue;
    }
    if (changes.loadingMeta) {
      this.loadingMeta = changes.loadingMeta.currentValue;
    }
  }

  requestRefresh() {
    this.refresh.emit();
  }
  requestFetch() {
    this.fetch.emit();
  }
}
