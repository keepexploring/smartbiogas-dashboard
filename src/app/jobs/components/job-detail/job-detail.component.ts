import { Component, OnInit, Input } from '@angular/core';
import { Job } from '../../models/job';
import { JobsService } from '../../../core/services/jobs.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.sass'],
})
export class JobDetailComponent implements OnInit {
  @Input() job: Job = null;
  loading = true;

  constructor(private service: JobsService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.getJob();
  }

  getJob() {
    const id = this.route.snapshot.paramMap.get('id');
    this.service.fetchJob(id).subscribe((job: Job) => {
      this.job = job;
      this.loading = false;
    });
  }
}
