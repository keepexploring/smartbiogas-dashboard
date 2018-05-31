import { User } from './user';
import { HttpResponse } from '@angular/common/http';

export class Technician extends User {
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
  ward: string;
  languages_spoken: string[];

  address: string;

  static fromResponse(response: HttpResponse<any>): Technician | Technician[] {
    const isSingle: boolean = !response.body.objects;

    if (isSingle) {
      return Technician.parse(response.body);
    }

    return response.body.objects.map(item => {
      return Technician.parse(item);
    });
  }

  constructor(private tech?: Partial<Technician>) {
    super(tech);
    Object.assign(this, tech);
  }

  private static parse(data: any): Technician {
    return new this({
      country: data.country,
      datetime_created: data.datetime_created,
      datetime_modified: data.datetime_modified,
      district: data.district,
      email: data.email,
      first_name: data.first_name,
      id: data.id,
      last_name: data.last_name,
      neighbourhood: data.neighbourhood,
      other_address_details: data.other_address_details,
      phone_number: data.phone_number,
      postcode: data.postcode,
      region: data.region,
      resource_uri: data.resource_uri,
      role: data.role,
      // user: data.user,
      user_photo: data.user_photo,
      village: data.village,
      ward: data.ward,

      acredit_to_install: data.technician_details.acredit_to_install,
      acredited_to_fix: data.technician_details.acredited_to_fix,
      average_rating: data.technician_details.average_rating,
      languages_spoken: data.technician_details.languages_spoken,
      location: data.technician_details.location,
      max_num_jobs_allowed: data.technician_details.max_num_jobs_allowed,
      number_jobs_active: data.technician_details.number_jobs_active,
      number_of_jobs_completed: data.technician_details.number_of_jobs_completed,
      // Dupe
      // resource_uri: data.technician_details.resource_uri,
      specialist_skills: data.technician_details.specialist_skills,
      status: data.technician_details.status,
      technician_id: data.technician_details.technician_id,
      what3words: data.technician_details.what3words,
      willing_to_travel: data.technician_details.willing_to_travel,
    });
  }

  private getAddress = (): string => {
    let address = '';
    address += this.other_address_details ? this.other_address_details + ' ' : '';
    address += this.postcode ? this.postcode + ' ' : '';
    address += this.neighbourhood ? this.neighbourhood + ' ' : '';
    address += this.district ? this.district + ' ' : '';
    address += this.village ? this.village + ' ' : '';
    address += this.region ? this.region + ' ' : '';
    address += this.country ? this.country + ' ' : '';
    return address;
  };
}
