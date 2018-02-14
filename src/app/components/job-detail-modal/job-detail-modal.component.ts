import { Component, OnInit, Input } from '@angular/core';
import { Job } from '../../models/job';

@Component({
  selector: 'app-job-detail-modal',
  templateUrl: './job-detail-modal.component.html',
  styleUrls: ['./job-detail-modal.component.sass']
})
export class JobDetailModalComponent implements OnInit {
  @Input() job: Job;
  constructor() { }

  ngOnInit() {
  }
}
