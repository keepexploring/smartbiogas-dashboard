import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  OnChanges,
  SimpleChanges,
  Input,
} from '@angular/core';
import { Plant } from '../../models/plant';
import * as constants from '../../../shared/constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plants-map',
  templateUrl: './plants-map.component.html',
  styleUrls: ['./plants-map.component.sass'],
})
export class PlantsMapComponent implements OnInit, OnChanges {
  @Output() pageChanged: EventEmitter<number> = new EventEmitter<number>();
  @Input() plants: Plant[];
  @Input() loading: boolean = true;
  @Input() totalItems: number = 0;
  @Input() itemsPerPage: number = 0;
  @Input() totalPages: number;
  @Input() currentPage: number = 1;
  @Input() itemCount: number = 0;
  initialLat: number = constants.initialLat;
  initialLng: number = constants.initialLng;
  zoom: number = constants.initialZoom;
  mapStyles = constants.mapStyles;
  constructor(private router: Router) {}

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
    if (changes.itemCount) {
      this.itemCount = changes.itemCount.currentValue;
    }
  }

  onPageChange(number: number) {
    this.currentPage = number;
    this.pageChanged.emit(number);
  }

  gotoPlant(plant) {
    console.log(plant);
    this.router.navigate(['/plants/', plant.id]);
  }
}
