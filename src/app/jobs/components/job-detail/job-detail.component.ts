import { Component, OnInit, Input } from '@angular/core';
import { Job } from '../../models/job';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.sass']
})
export class JobDetailComponent implements OnInit {
  @Input() job: Job = null;
  loading = false; 
  
  constructor() { }

  ngOnInit() {
  }

}
