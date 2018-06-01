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
  selector: 'app-view-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent implements OnInit, OnChanges {
  @Output() refresh: EventEmitter<any> = new EventEmitter<any>();
  @Output() fetch: EventEmitter<any> = new EventEmitter<any>();

  @Input() title: string;

  @Input() loading: boolean;
  @Input() loadingMeta: boolean;

  @Input() count: number;
  @Input() total: number;

  @Input() link1: string;
  @Input() link2: string;
  @Input() link1text: string;
  @Input() link2text: string;

  constructor() {}

  ngOnInit() {
    console.log('HeaderComponent INIT: loading', this.loading);
    console.log('HeaderComponent INIT: loadingMeta', this.loadingMeta);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.loading) {
      console.log('Loading', changes.loading.currentValue);
      this.loading = changes.loading.currentValue;
    }
    if (changes.loadingMeta) {
      console.log('LoadingMeta', changes.loadingMeta.currentValue);
      this.loadingMeta = changes.loadingMeta.currentValue;
    }
  }

  requestRefresh() {
    console.log('refresh');
    this.refresh.emit();
  }
  requestFetch() {
    console.log('fetch');
    this.fetch.emit();
  }
}
