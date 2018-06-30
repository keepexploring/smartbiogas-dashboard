import {
  Component,
  Input,
  SimpleChanges,
  OnChanges,
  OnInit,
  EventEmitter,
  Output,
} from '@angular/core';
import { Job } from '../../models/job';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-jobs-table',
  templateUrl: './jobs-table.component.html',
  styleUrls: ['./jobs-table.component.sass'],
})
export class JobsTableComponent implements OnInit, OnChanges {
  @Input() items: Job[];
  @Input() loading: boolean = true;
  @Input() totalItems: number = 0;
  @Input() itemsPerPage: number = environment.defaultPaginationLimit;
  @Input() totalPages: number;
  @Output() changedPage: EventEmitter<any> = new EventEmitter();
  @Input() selectable: boolean = true;
  currentPage: number = 1;
  density: 'default' | 'condensed' = 'default';

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.items) {
      this.items = changes.items.currentValue;
    }
    if (changes.loading) {
      this.loading = changes.loading.currentValue;
    }
    if (changes.totalItems) {
      this.totalItems = changes.totalItems.currentValue;
    }
    if (changes.itemsPerPage) {
      this.itemsPerPage = changes.itemsPerPage.currentValue;
    }
    if (changes.totalPages) {
      this.totalPages = changes.totalPages.currentValue;
    }
  }

  onPageChange(nextPage: number) {
    this.currentPage = nextPage;
    this.changedPage.emit();
  }

  setDensity(density) {
    this.density = density;
  }
}
