export class Technician {
	id: number;
	technician_id: string;
	country: string;
	datetime_created: string;
	datetime_modified: string;
	district: string;
	first_name: string;
	last_name: string;
	neighbourhood: string;
	other_address_details: string;
	phone_number: string;
	postcode: string;
	region: string;
	role: string;
	acredit_to_install: string;
	acredited_to_fix: string;
	average_rating: number;
	location: string;
	max_num_jobs_allowed: number;
	number_jobs_active: number;
	number_of_jobs_completed: number;
	specialist_skills: string;
	status: boolean;
	what3words: string;
	willing_to_travel: number;
	user_photo: string;
	village: string;
	ward: string;

	getFullName(): string {
		return this.first_name + ' ' + this.last_name;
	}

	getStatus(): string {
		return this.status ? 'Active' : 'Inactive';
	}

	getAddress(): string {
		let address = "";
		address += this.other_address_details ? this.other_address_details + '<br>' : '';
		address += this.postcode ? this.postcode + '<br>' : '';
		address += this.neighbourhood ? this.neighbourhood + '<br>' : '';
		address += this.district ? this.district + '<br>' : '';
		address += this.village ? this.village + '<br>' : '';
		address += this.region ? this.region + '<br>' : '';
		address += this.country ? this.country + '<br>' : '';

		return address;
	}

}
