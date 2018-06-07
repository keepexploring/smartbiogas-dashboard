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

  // for creation
  username: string;
  password: string;
  mobile: string;

  static fromResponse(response: HttpResponse<any>): Technician | Technician[] {
    const isSingle: boolean = !response.body.objects;

    if (isSingle) {
      return Technician.parse(response.body);
    }

    return response.body.objects.map(item => {
      return Technician.parse(item);
    });
  }

  // constructor(tech?: Partial<Technician>) {
  //   super(tech);
  //   Object.assign(this, tech);
  // }

  private static parse(data: any): Technician {
    const item = new Technician();
    item.country = data.country;
    item.datetime_created = data.datetime_created;
    item.datetime_modified = data.datetime_modified;
    item.district = data.district;
    item.email = data.email;
    item.first_name = data.first_name;
    item.id = data.id;
    item.last_name = data.last_name;
    item.neighbourhood = data.neighbourhood;
    item.other_address_details = data.other_address_details;
    item.phone_number = data.phone_number;
    item.postcode = data.postcode;
    item.region = data.region;
    item.resource_uri = data.resource_uri;
    item.role = data.role;
    item.user_photo = data.user_photo;
    item.village = data.village;
    item.ward = data.ward;

    if (data.technician_details) {
      item.acredit_to_install = data.technician_details.acredit_to_install;
      item.acredited_to_fix = data.technician_details.acredited_to_fix;
      item.average_rating = data.technician_details.average_rating;
      item.languages_spoken = data.technician_details.languages_spoken;
      item.location = data.technician_details.location;
      item.max_num_jobs_allowed = data.technician_details.max_num_jobs_allowed;
      item.number_jobs_active = data.technician_details.number_jobs_active;
      item.number_of_jobs_completed = data.technician_details.number_of_jobs_completed;
      item.specialist_skills = data.technician_details.specialist_skills;
      item.status = data.technician_details.status;
      item.technician_id = data.technician_details.technician_id;
      item.what3words = data.technician_details.what3words;
      item.willing_to_travel = data.technician_details.willing_to_travel;
    }

    return item;
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

  static skills = [
    {
      name: 'plumber',
      label: 'Plumber',
      selected: false,
    },
    {
      name: 'mason',
      label: 'Mason',
      selected: false,
    },
    {
      name: 'manager',
      label: 'Manager',
      selected: false,
    },
    {
      name: 'design',
      label: 'Design',
      selected: false,
    },
    {
      name: 'calculations',
      label: 'Calculations',
      selected: false,
    },
  ];

  static accreditedSkills = [
    {
      name: 'tubular',
      label: 'Tubular',
      selected: false,
    },
    {
      name: 'fixed_dome',
      label: 'Fixed Dome',
      selected: false,
    },
  ];
}
