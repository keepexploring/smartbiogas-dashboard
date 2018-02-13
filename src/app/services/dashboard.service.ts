import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { HelpersService } from './helpers.service';
import { EndpointService } from './endpoint.service';
import { Dashboard } from '../models/dashboard';

@Injectable()
export class DashboardService {
  constructor(private http: HttpClient, private helpers: HelpersService, private endpoints: EndpointService) { }

  getDashboard(): Observable<Dashboard>{
    return this.http.get(this.endpoints.dashboard.index)
      .map(response => this.mapDataToModel(response))
      .catch(this.helpers.handleResponseError);
  }
  
  private mapDataToModel(response: any): Dashboard {
    let firstDataObject = response.objects[0];
    let item = new Dashboard();
    item.id = firstDataObject.id;
    item.activePlants = firstDataObject.active;
    item.repairTime = firstDataObject.avtime;
    item.faults = firstDataObject.faults;
    item.faultsFixed = firstDataObject.fixed;
    item.jobs = firstDataObject.jobs;
    item.plants = firstDataObject.plants;
    item.createdAt = firstDataObject.created_at;
    return item;
  }
}
