import { Component, OnInit, Input } from '@angular/core';
import { Job } from '../../models/job';
import { JobsService } from '../../../core/services/jobs.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.sass'],
})
export class JobDetailComponent implements OnInit {
  @Input() job: Job = null;
  loading = false;

  subscription: Subscription;

  constructor(private service: JobsService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.getJob();
    this.service.loadingSingle.subscribe(loadingSingle => {
      this.loading = loadingSingle;
    });
  }

  getJob() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.subscription = this.service.items.subscribe(jobs => {
      const found = jobs.find(j => j.id == id);
      if (found) {
        this.job = found;
        return;
      }
      this.service.fetchJob(id);
      return;
    });
  }
}
