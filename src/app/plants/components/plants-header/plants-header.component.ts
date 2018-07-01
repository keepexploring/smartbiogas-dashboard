import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { PlantsService } from '../../services/plants.service';

@Component({
  selector: 'app-plants-header',
  templateUrl: './plants-header.component.html',
  styleUrls: ['./plants-header.component.sass'],
})
export class PlantsHeaderComponent implements OnInit {
  @Input() title: string = 'Plants';
  loading: boolean = true;
  loadingMeta: boolean = true;
  total: number;
  count: number;
  subscriptions: Subscription[];

  constructor(private service: PlantsService) {}

  ngOnInit() {
    this.subscriptions = [
      this.service.items.subscribe(items => {
        this.count = items.length;
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
