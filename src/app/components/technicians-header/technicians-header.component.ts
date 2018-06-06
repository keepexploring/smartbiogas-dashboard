import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';

import { ApiResponseMeta } from '../../models/api-response-meta';
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
        if (technicians.length == 0) {
          this.techniciansService.get(1);
        }
      }),
      this.techniciansService.loading.subscribe(loading => {
        this.loading = loading;
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
