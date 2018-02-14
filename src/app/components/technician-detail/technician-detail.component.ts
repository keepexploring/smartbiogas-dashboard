import { Component, OnInit, Input } from '@angular/core';
import { Technician } from '../../models/technician';
import { JobsService } from '../../services/jobs.service';
import { Job } from '../../models/job';
import { HelpersService } from '../../services/helpers.service';

@Component({
  selector: 'app-technician-detail',
  templateUrl: './technician-detail.component.html',
  styleUrls: ['./technician-detail.component.sass']
})
export class TechnicianDetailComponent implements OnInit {

  @Input() technician: Technician;
  loadingJobs = true;
  jobs: Job[];
  
  constructor(private jobsService: JobsService, private helpers: HelpersService) { }

  ngOnInit() {
    this.jobsService.getForUser(this.technician.technician_id).subscribe((response) => {
      this.jobs = response;
      this.loadingJobs = false;
    }, (error) => {
      this.helpers.handleError(error);
      this.loadingJobs = false;
    });
  }

}
