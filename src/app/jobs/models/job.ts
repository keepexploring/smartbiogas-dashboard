import { User } from '../../shared/models/user';
import { HttpResponse } from '@angular/common/http';

export class Job {
  job_id: string;
  job_status: string;
  other: string;
  overdue_for_acceptance: boolean;
  priority: boolean;

  client_feedback_additional: string;
  client_feedback_star: string;
  completed: boolean;
  date_completed: string;
  date_flagged: string;
  due_date: string;
  fault_class: string;
  fault_description: string;

  // Parse from system_info
  id: number;
  QP_status: string;
  country: string;
  current_status: string;
  district: string;
  funding_souce: string;
  funding_source_notes: string;
  location: string;
  neighbourhood: string;
  other_address_details: string;
  plant_id: string;
  postcode: string;
  region: string;
  sensor_status: string;
  supplier: string;
  type_biogas: string;
  verfied: boolean;
  village: string;
  volume_biogas: string;
  ward: string;
  install_date: string;

  // Parse from contact arrays
  constructing_tech: User[];
  contact_info: User[];
  fixers: User[];
  static helpers: any;

  static fromResponse(response: HttpResponse<any>): Job | Job[] {
    const isSingle: boolean = !response.body.objects;
    if (isSingle) {
      return Job.parse(response.body);
    }

    if (response.body.data) {
      return response.body.data.map(item => {
        return Job.parse(item);
      });
    }
    return response.body.objects.map(item => {
      return Job.parse(item);
    });
  }

  private static parse(data: any) {
    console.log(data);
    let item = new Job();
    item.job_id = data.job_id;
    item.job_status = data.job_status;
    item.other = data.other;
    item.overdue_for_acceptance = data.overdue_for_acceptance;
    item.priority = data.priority;
    item.client_feedback_additional = data.client_feedback_additional;
    item.client_feedback_star = data.client_feedback_star;
    item.completed = data.completed;
    item.date_completed = data.date_completed;
    item.date_flagged = data.date_flagged;
    item.due_date = data.due_date;
    item.fault_class = data.fault_class;
    item.fault_description = data.fault_description;
    if (data.system_info) {
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
    }
    item.constructing_tech = this.mapConstructingTech(data);
    item.contact_info = this.mapContactList(data);
    item.fixers = this.mapFixersList(data);
    console.log(item);
    return item;
  }

  private static mapConstructingTech(data) {
    if (!data.constructing_tech) {
      return [];
    }

    return data.constructing_tech.map(ct => {
      return this.parseContactFromJsonData(ct);
    });
  }
  private static mapContactList(data) {
    if (!data.contact_info) {
      return [];
    }
    return data.contact_info.map(contactData => {
      let contact = this.parseContactFromJsonData(contactData);
      contact.mobile = contactData.mobile;
      contact.last_name = contactData.surname;
      return contact;
    });
  }
  private static mapFixersList(data) {
    if (!data.fixers) {
      return [];
    }
    return data.fixers.map(fixer => this.parseContactFromJsonData(fixer));
  }

  private static parseContactFromJsonData(contactData: any): User {
    let contact = new User();
    contact.id = contactData.user_id;
    if (contactData && contactData.company_name) {
      contact.company_name = contactData.company_name[0];
    }
    contact.contact_type = contactData.contact_type;
    contact.first_name = contactData.first_name;
    contact.last_name = contactData.last_name;
    contact.mobile = contactData.mobile;
    contact.role = contactData.role;
    contact.status = contactData.status;

    if (contactData.company_name) {
      contact.company_name = contactData.company_name[0];
    }

    return contact;
  }
}
