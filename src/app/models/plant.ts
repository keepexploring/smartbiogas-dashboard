import { BiogasPlantContact } from "./biogas-plant-contact";

export class Plant {
	id: number;
	QP_status: string;
	country: string;
	district: string;
	funding_souce: string;
	funding_source_notes: string;
	location: string;
	neighbourhood: string;
	other_address_details: string;
	postcode: string;
	region: string;
	resource_uri: string;
	supplier: string;
	type_biogas: string;
	verfied: boolean;
	village: string;
	volume_biogas: string;
	what3words: string;
	
	current_status: string;
	sensor_status: string;

	contact: BiogasPlantContact[];

	getOwner() {
		if (this.contact) {
			return this.contact.filter(o => o.contact_type.toLowerCase() == 'owner')[0];
		}
	}

}
