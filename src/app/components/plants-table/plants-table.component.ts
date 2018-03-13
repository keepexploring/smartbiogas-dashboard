import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Plant } from '../../models/plant';
import { PlantsService } from '../../services/plants.service';
import { HelpersService } from '../../services/helpers.service';

@Component({
  selector: 'app-plants-table',
  templateUrl: './plants-table.component.html',
  styleUrls: ['./plants-table.component.sass']
})
export class PlantsTableComponent implements OnInit {
  @Input() selectable: boolean = true;
  @Output() selectPlant = new EventEmitter<Plant>();

  loading: boolean = true;
  plants: Plant[];
  selectedPlant: Plant;

  page: number = 1;
  totalItems: number = 0;
  itemsPerPage: number = 0;
  totalPages: number;

  constructor(private service: PlantsService, private helpers: HelpersService) { }

  ngOnInit() {
    this.getPlants();
  }

  onPageChange(number: number) {
    this.page = number;
    this.getPlants();
    this.loading = true;
  }

  select(plant: Plant) {
    this.selectedPlant = plant;
    this.selectPlant.emit(plant);
  }

  getPlants() {
    this.service.getPlants(this.page).subscribe((response) => {
      this.plants = response;
      this.loading = false;
      this.totalItems = this.service.totalItems;
      this.itemsPerPage = this.service.itemsPerPage;
      this.totalPages = this.helpers.calculateTotalApiPages(this.totalItems, this.itemsPerPage)
    }, (error) => {
      this.helpers.handleError(error);
      this.loading = false;
    });
  }
}
