import { User } from '../../shared/models/user';

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
  verification_of_engagement: boolean;
  additional_information: string;

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
}
