import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { EndpointService } from './endpoint.service';
import { HelpersService } from './helpers.service';
import { Job } from '../models/job';
import { User } from '../models/user';

@Injectable()
export class JobsService {
  totalItems: number = 10;
  itemsPerPage: number = 10;

  constructor(
    private http: HttpClient,
    private helpers: HelpersService,
    private endpoints: EndpointService,
  ) {}

  getJobs(page: number = 0, userId?: number, plantId?: number): Observable<Job[]> {
    let endpoint = this.getEndpoint(page, userId, plantId);
    return this.http.get(endpoint).pipe(
      map(response => {
        this.totalItems = response['meta'] ? response['meta'].total_count : 0;
        this.itemsPerPage = response['meta'] ? response['meta'].limit : 0;
        return this.mapDataToModel(response);
      }),
      catchError(this.helpers.handleResponseError),
    );
  }

  private getEndpoint(page: number = 0, userId?: number, plantId?: number) {
    let offset = this.helpers.getOffsetForPagination(page, this.itemsPerPage);
    if (userId) {
      return this.endpoints.jobs.user + userId + offset;
    } else if (plantId) {
      return this.endpoints.jobs.plant + plantId + offset;
    } else {
      return this.endpoints.jobs.index + offset;
    }
  }

  private mapDataToModel(response: any): Job[] {
    let items: Job[] = [];
    response.objects.forEach(data => {
      let item = new Job();
      item.job_id = data.job_id;
      item.job_status = data.job_status;
      item.other = data.other;
      item.overdue_for_acceptance = data.overdue_for_acceptance;
      item.priority = data.priority;
      item.additional_information = data.additional_information;
      item.client_feedback_additional = data.client_feedback_additional;
      item.client_feedback_star = data.client_feedback_star;
      item.completed = data.completed;
      item.date_completed = data.date_completed;
      item.date_flagged = data.date_flagged;
      item.due_date = data.due_date;
      item.fault_class = data.fault_class;
      item.fault_description = data.fault_description;
      item.verification_of_engagement = data.verification_of_engagement;
      item.id = data.system_info.id;
      item.QP_status = data.system_info.QP_status;
      item.country = data.system_info.country;
      item.current_status = data.system_info.current_status;
      item.district = data.system_info.district;
      item.funding_souce = data.system_info.funding_souce;
      item.funding_source_notes = data.system_info.funding_source_notes;
      item.location = data.system_info.location;
      item.neighbourhood = data.system_info.neighbourhood;
      item.other_address_details = data.system_info.other_address_details;
      item.plant_id = data.system_info.plant_id;
      item.postcode = data.system_info.postcode;
      item.region = data.system_info.region;
      item.sensor_status = data.system_info.sensor_status;
      item.supplier = data.system_info.supplier;
      item.type_biogas = data.system_info.type_biogas;
      item.verfied = data.system_info.verfied;
      item.village = data.system_info.village;
      item.volume_biogas = data.system_info.volume_biogas;
      item.ward = data.system_info.ward;
      item.install_date = data.system_info.install_date;
      item.constructing_tech = this.mapConstructingTech(data);
      item.contact_info = this.mapContactList(data);
      item.fixers = this.mapFixersList(data);
      items.push(item);
    });
    return items;
  }

  private mapConstructingTech(data) {
    let techsList = [];
    if (data.constructing_tech) {
      data.constructing_tech.forEach(ct => {
        techsList.push(this.helpers.parseContactFromJsonData(ct));
      });
    }
    return techsList;
  }
  private mapContactList(data) {
    let contactList = [];
    if (data.contact_info) {
      data.contact_info.forEach(contactData => {
        let contact = this.helpers.parseContactFromJsonData(contactData);
        contact.phone_number = contactData.mobile;
        contact.last_name = contactData.surname;
        contactList.push(contact);
      });
    }
    return contactList;
  }
  private mapFixersList(data) {
    let fixersList = [];
    if (data.fixers) {
      let fixersList = [];
      data.fixers.forEach(fixer => {
        fixersList.push(this.helpers.parseContactFromJsonData(fixer));
      });
    }
    return fixersList;
  }
}
