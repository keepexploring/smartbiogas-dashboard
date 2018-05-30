import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Plant } from '../models/plant';
import { HelpersService } from './helpers.service';
import { EndpointService } from './endpoint.service';
import { BiogasPlantContact } from '../models/biogas-plant-contact';

@Injectable()
export class PlantsService {
  totalItems: number = 10;
  itemsPerPage: number = 10;

  constructor(
    private http: HttpClient,
    private helpers: HelpersService,
    private endpoints: EndpointService,
  ) {}

  getPlants(page: number): Observable<Plant[]> {
    let offset = this.endpoints.getOffset(page, this.itemsPerPage);
    return this.http.get(this.endpoints.plants.index + offset).pipe(
      map(response => {
        this.totalItems = response['meta'] ? response['meta'].total_count : 0;
        this.itemsPerPage = response['meta'] ? response['meta'].limit : 0;
        return this.mapDataToModel(response);
      }),
      catchError(this.helpers.handleResponseError),
    );
  }

  private mapDataToModel(response: any): Plant[] {
    let items: Plant[] = [];
    response.objects.forEach(data => {
      let item = new Plant();
      item.id = data.id;
      item.QP_status = data.QP_status;
      item.country = data.country;
      item.district = data.district;
      item.funding_souce = data.funding_souce;
      item.funding_source_notes = data.funding_source_notes;
      item.location = data.location;
      item.neighbourhood = data.neighbourhood;
      item.other_address_details = data.other_address_details;
      item.postcode = data.postcode;
      item.region = data.region;
      item.resource_uri = data.resource_uri;
      item.supplier = data.supplier;
      item.type_biogas = data.type_biogas;
      item.verfied = data.verfied;
      item.village = data.village;
      item.volume_biogas = data.volume_biogas;
      item.current_status = data.current_status;
      item.sensor_status = data.sensor_status;
      item.what3words = data.what3words;
      item.contact = this.mapContacts(data);
      items.push(item);
    });
    return items;
  }

  private mapContacts(data) {
    let contactList: BiogasPlantContact[] = [];
    if (data.contact) {
      data.contact.forEach(ct => {
        let contact = new BiogasPlantContact();
        contact.associated_company_id = ct.associated_company_id;
        contact.contact_type = ct.contact_type;
        contact.email = ct.email;
        contact.first_name = ct.first_name;
        contact.id = ct.id;
        contact.phone_number = ct.mobile;
        contact.last_name = ct.surname;
        contact.uid = ct.uid;
        contact.role = ct.role;
        contactList.push(contact);
      });
    }
    return contactList;
  }
}
