import { Component, OnInit, OnChanges, Input, SimpleChanges, OnDestroy } from '@angular/core';
import { Technician } from '../../models/technician';
import { JobsService } from '../../services/jobs.service';
import { Job } from '../../models/job';
import { HelpersService } from '../../services/helpers.service';
import { TechniciansService } from '../../services/technicians.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-technician-detail',
  templateUrl: './technician-detail.component.html',
  styleUrls: ['./technician-detail.component.sass'],
})
export class TechnicianDetailComponent implements OnInit, OnChanges, OnDestroy {
  technician: Technician;
  subscription: Subscription;
  loading: boolean = true;
  loadingJobs = true;
  jobs: Job[];

  constructor(
    private route: ActivatedRoute,
    private jobsService: JobsService,
    private techniciansService: TechniciansService,
    private helpers: HelpersService,
  ) {}

  ngOnInit() {
    this.getTechnician();
    this.techniciansService.loadingSingle.subscribe(loadingSingle => {
      this.loading = loadingSingle;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.technician && !changes.technician.firstChange) {
      this.loadingJobs = true;
      this.jobs = null;
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getTechnician() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.subscription = this.techniciansService.items.subscribe(technicians => {
      const techFound = technicians.find(t => t.id == id);
      if (techFound) {
        this.technician = techFound;
        return;
      }

      this.techniciansService.fetchTechnician(id);
      return;
    });
  }
}
