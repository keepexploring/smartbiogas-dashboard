import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { Technician } from '../../models/technician';
import { JobsService } from '../../services/jobs.service';
import { Job } from '../../models/job';
import { HelpersService } from '../../services/helpers.service';

@Component({
  selector: 'app-technician-detail',
  templateUrl: './technician-detail.component.html',
  styleUrls: ['./technician-detail.component.sass']
})
export class TechnicianDetailComponent implements OnInit, OnChanges {
  @Input() technician: Technician;
  loadingJobs = true;
  jobs: Job[];

  constructor(private jobsService: JobsService, private helpers: HelpersService) { }
  
  getJobs() {
    this.jobsService.getForUser(this.technician.id).subscribe((response) => {
      this.jobs = response;
      this.loadingJobs = false;
    }, (error) => {
      this.helpers.handleError(error);
      this.loadingJobs = false;
    }); 
  }

  ngOnInit() {
    if(this.technician){
      this.getJobs();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.technician && !changes.technician.firstChange) {
      this.loadingJobs = true;
      this.jobs = null;
      this.getJobs();
    }
  }
}
