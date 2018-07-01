import {
  Component,
  OnInit,
  OnChanges,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Plant } from '../../models/plant';

@Component({
  selector: 'app-plants-table',
  templateUrl: './plants-table.component.html',
  styleUrls: ['./plants-table.component.sass'],
})
export class PlantsTableComponent implements OnInit, OnChanges {
  @Output() pageChanged: EventEmitter<number> = new EventEmitter<number>();
  @Input() loading: boolean = true;
  @Input() plants: Plant[];
  @Input() totalItems: number = 0;
  @Input() itemCount: number = 0;
  @Input() itemsPerPage: number = 0;
  @Input() totalPages: number = 1;
  @Input() currentPage: number = 1;
  density: 'default' | 'condensed' = 'default';

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.loading) {
      this.loading = changes.loading.currentValue;
    }
    if (changes.plants) {
      this.plants = changes.plants.currentValue;
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

  onPageChange(number: number) {
    this.currentPage = number;
    this.pageChanged.emit(number);
  }
  setDensity(density) {
    this.density = density;
  }
}
