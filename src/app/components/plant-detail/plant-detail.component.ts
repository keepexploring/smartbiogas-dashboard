import { Component, OnInit, Input } from '@angular/core';
import { Plant } from '../../models/plant';
import { JobsService } from '../../services/jobs.service';
import { HelpersService } from '../../services/helpers.service';
import { Job } from '../../models/job';

@Component({
  selector: 'app-plant-detail',
  templateUrl: './plant-detail.component.html',
  styleUrls: ['./plant-detail.component.sass']
})
export class PlantDetailComponent implements OnInit {
  @Input() plant: Plant;
  loadingJobs = true;
  jobs: Job[];
  
  constructor(private jobsService: JobsService, private helpers: HelpersService) { }

  ngOnInit() {
    this.jobsService.getForPlant(this.plant.id).subscribe((response) => {
      this.jobs = response;
      this.loadingJobs = false;
    }, (error) => {
      this.helpers.handleError(error);
      this.loadingJobs = false;
    });
  }

}
