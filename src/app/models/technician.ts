import { User } from "./user";

export class Technician extends User{
	technician_id: string;
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

	getAddress(): string {
		let address = "";
		address += this.other_address_details ? this.other_address_details + ' ' : '';
		address += this.postcode ? this.postcode + ' ' : '';
		address += this.neighbourhood ? this.neighbourhood + ' ' : '';
		address += this.district ? this.district + ' ' : '';
		address += this.village ? this.village + ' ' : '';
		address += this.region ? this.region + ' ' : '';
		address += this.country ? this.country + ' ' : '';
		return address;
	}
}
