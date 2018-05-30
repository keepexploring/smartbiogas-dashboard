import { User } from './user';
import { HttpResponse } from '@angular/common/http';

export class Technician extends User {
  id: number;
  technician_id: number;
  country: string;
  datetime_created: string;
  datetime_modified: string;
  district: string;
  neighbourhood: string;
  other_address_details: string;
  postcode: string;
  region: string;
  acredit_to_install: string;
  acredited_to_fix: string;
  average_rating: number;
  location: string;
  max_num_jobs_allowed: number;
  number_jobs_active: number;
  number_of_jobs_completed: number;
  specialist_skills: string;
  what3words: string;
  willing_to_travel: number;
  user_photo: string;
  village: string;

  getAddress(): string {
    let address = '';
    address += this.other_address_details ? this.other_address_details + ' ' : '';
    address += this.postcode ? this.postcode + ' ' : '';
    address += this.neighbourhood ? this.neighbourhood + ' ' : '';
    address += this.district ? this.district + ' ' : '';
    address += this.village ? this.village + ' ' : '';
    address += this.region ? this.region + ' ' : '';
    address += this.country ? this.country + ' ' : '';
    return address;
  }

  static listFromResponse(response: HttpResponse<any>): Technician[] {
    return response.body.objects.map(technician => {
      return Technician.fromResponse(technician);
    });
  }

  static fromResponse(data: any): Technician {
    let item = new this();
    item.id = data.id;
    item.technician_id = data.technician_details.technician_id;
    item.country = data.country;
    item.datetime_created = data.datetime_created;
    item.datetime_modified = data.datetime_modified;
    item.district = data.district;
    item.first_name = data.first_name;
    item.last_name = data.last_name;
    item.neighbourhood = data.neighbourhood;
    item.other_address_details = data.other_address_details;
    item.phone_number = data.phone_number;
    item.postcode = data.postcode;
    item.region = data.region;
    item.role = data.role;
    item.acredit_to_install = data.acredit_to_install;
    item.acredited_to_fix = data.acredited_to_fix;
    item.average_rating = data.average_rating;
    item.location = data.location;
    item.max_num_jobs_allowed = data.max_num_jobs_allowed;
    item.number_jobs_active = data.technician_details.number_jobs_active;
    item.number_of_jobs_completed = data.number_of_jobs_completed;
    item.specialist_skills = data.specialist_skills;
    item.status = data.status;
    item.what3words = data.what3words;
    item.willing_to_travel = data.willing_to_travel;
    item.user_photo = data.user_photo;
    item.village = data.village;
    return item;
  }
}
