import {
  Component,
  OnInit,
  EventEmitter,
  Input,
  Output,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

import { Plant } from '../../models/plant';
import { HelpersService } from '../../services/helpers.service';
import { PlantsService } from '../../services/plants.service';
import { mapStyles } from '../../core/constants';

@Component({
  selector: 'app-plants-map',
  templateUrl: './plants-map.component.html',
  styleUrls: ['./plants-map.component.sass'],
})
export class PlantsMapComponent implements OnInit, OnChanges {
  @Output() selectPlant = new EventEmitter<Plant>();
  initialLat: number = -3.3981431;
  initialLng: number = 36.6421933;
  zoom: number = 7;
  selectedPlant: Plant;
  plants: Plant[];
  loading: boolean = true;

  page: number = 1;
  totalItems: number = 0;
  itemsPerPage: number = 0;
  totalPages: number;

  constructor(private service: PlantsService, private helpers: HelpersService) {}

  mapStyles = mapStyles;

  select(plant: Plant) {
    this.selectedPlant = plant;
    this.selectPlant.emit(plant);
  }

  onPageChange(number: number) {
    this.page = number;
    this.getPlants();
    this.loading = true;
  }

  ngOnInit() {
    this.getPlants();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.plants.firstChange) {
      this.processPlantLocations();
    }
  }

  private processPlantLocations() {
    this.plants = this.plants.filter(p => p.location && p.location != '');
    this.plants.forEach(p => {
      p.getCoordinates();
      let path = '/assets/images/map-marker-';
      if (p.current_status) {
        switch (p.current_status.toLowerCase()) {
          case 'fault':
            p.mapMarkerIcon = path + 'red.svg';
            break;
          case 'active':
            p.mapMarkerIcon = path + 'green.svg';
            break;
          default:
            p.mapMarkerIcon = path + 'gray.svg';
            break;
        }
      } else {
        p.mapMarkerIcon = path + 'gray.svg';
      }
    });
  }

  getPlants() {
    this.service.getPlants(this.page).subscribe(response => {
      this.plants = response;
      this.loading = false;
      this.totalItems = this.service.totalItems;
      this.itemsPerPage = this.service.itemsPerPage;
      this.totalPages = this.helpers.calculateTotalApiPages(this.totalItems, this.itemsPerPage);
      this.processPlantLocations();
    });
  }
}
