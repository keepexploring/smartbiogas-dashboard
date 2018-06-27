import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { TechniciansService } from '../../services/technicians.service';

@Component({
  selector: 'app-technicians-header',
  templateUrl: './technicians-header.component.html',
  styleUrls: ['./technicians-header.component.sass'],
})
export class TechniciansHeaderComponent implements OnInit, OnDestroy {
  @Input() title: string = '';

  loading: boolean = true;
  loadingMeta: boolean = true;
  total: number;
  count: number;
  subscriptions: Subscription[];

  constructor(private techniciansService: TechniciansService) {}

  ngOnInit() {
    this.subscriptions = [
      this.techniciansService.items.subscribe(technicians => {
        this.count = technicians.length;
      }),
      this.techniciansService.loading.subscribe(loading => {
        this.loading = loading;
        if (this.count === 0 && !loading) {
          this.techniciansService.prefetch(0);
        }
      }),
      this.techniciansService.responseMetadata.subscribe(meta => {
        if (meta.isRemote) {
          this.total = meta.totalItems;
          this.loadingMeta = false;
        }
      }),
    ];
  }

  handleRefresh() {
    this.techniciansService.refresh();
  }

  handleFetch() {
    this.techniciansService.fetch();
  }

  ngOnDestroy() {
    this.subscriptions.map(sub => {
      sub.unsubscribe();
    });
  }
}
