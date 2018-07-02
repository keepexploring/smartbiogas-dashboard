import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { JobsService } from '../../../core/services/jobs.service';

@Component({
  selector: 'app-jobs-header',
  templateUrl: './jobs-header.component.html',
  styleUrls: ['./jobs-header.component.sass'],
})
export class JobsHeaderComponent implements OnInit {
  @Input() title: string = 'Jobs';
  loading: boolean = true;
  loadingMeta: boolean = true;
  total: number;
  count: number;
  subscriptions: Subscription[];

  constructor(private service: JobsService) {}

  ngOnInit() {
    this.subscriptions = [
      this.service.items.subscribe(jobs => {
        this.count = jobs.length;
      }),
      this.service.loading.subscribe(loading => {
        this.loading = loading;
        if (this.count === 0 && !loading) {
          this.service.prefetch(0);
        }
      }),
      this.service.responseMetadata.subscribe(meta => {
        if (meta.isRemote) {
          this.total = meta.totalItems;
          this.loadingMeta = false;
        }
      }),
    ];
  }

  handleFetch() {
    this.service.fetch();
  }

  ngOnDestroy() {
    this.subscriptions.map(sub => {
      sub.unsubscribe();
    });
  }
}
