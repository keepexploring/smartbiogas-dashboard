import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Plant } from '../../models/plant';
import { JobsService } from '../../services/jobs.service';
import { HelpersService } from '../../services/helpers.service';
import { Job } from '../../models/job';

@Component({
  selector: 'app-plant-detail',
  templateUrl: './plant-detail.component.html',
  styleUrls: ['./plant-detail.component.sass']
})
export class PlantDetailComponent implements OnInit, OnChanges {
  @Input() plant: Plant;
  loadingJobs = true;
  jobs: Job[];
  
  constructor(private jobsService: JobsService, private helpers: HelpersService) { }

  getJobs() {
    this.jobsService.getForPlant(this.plant.id).subscribe((response) => {
      this.jobs = response;
      this.loadingJobs = false;
    }, (error) => {
      this.helpers.handleError(error);
      this.loadingJobs = false;
    });
  }

  ngOnInit() {
    this.getJobs();
  }

  ngOnChanges(changes: SimpleChanges) {
    if(!changes.plant.firstChange) {
      this.loadingJobs = true;
      this.jobs = null;
      this.getJobs();
    }
  }

}
