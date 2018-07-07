import { BiogasPlantContact } from './biogas-plant-contact';

export class Plant {
  id: number;
  biogas_plant_name: string;
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
  owner: BiogasPlantContact = this.getOwner();
  // Computed properties

  get name() {
    return this.biogas_plant_name;
  }
  get coordinates(): { lat: number; lng: number } {
    let latitude: number;
    let longitude: number;
    if (this.location) {
      let firstBracketIndex = this.location.indexOf('(') + 1;
      let lastBracketIndex = this.location.indexOf(')');
      if (firstBracketIndex > -1 && lastBracketIndex > -1) {
        // Got lat and lng
        let locationString = this.location.substring(firstBracketIndex, lastBracketIndex);
        let coordinates = locationString.split(' ');
        longitude = parseFloat(coordinates[0]);
        latitude = parseFloat(coordinates[1]);
      }
    }
    return {
      lat: latitude,
      lng: longitude,
    };
  }
  get lat(): number {
    return this.coordinates.lat;
  }
  get lng(): number {
    return this.coordinates.lng;
  }

  get mapMarkerIcon(): string {
    let path = '/assets/images/map-marker-';
    if (this.current_status) {
      switch (this.current_status.toLowerCase()) {
        case 'fault':
          return path + 'red.svg';
        case 'active':
          return path + 'green.svg';
        default:
          return path + 'gray.svg';
      }
    }
    return path + 'gray.svg';
  }

  private getOwner(): BiogasPlantContact {
    if (this.contact) {
      return (
        this.contact.filter(o => o.contact_type.toLowerCase() == 'owner')[0] ||
        new BiogasPlantContact()
      );
    }
  }

  static fromResponse(response: any): Plant[] {
    return response.body.objects.map(data => {
      return Plant.parseSingle(data);
    });
  }

  static parseSingle(data): Plant {
    let item = new Plant();
    item.id = data.id;
    item.biogas_plant_name = data.biogas_plant_name;
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
    item.contact = Plant.mapContacts(data);
    return item;
  }

  static mapContacts(data) {
    let contactList: BiogasPlantContact[] = [];
    if (data.contact) {
      data.contact.forEach(ct => {
        let contact = new BiogasPlantContact();
        contact.associated_company_id = ct.associated_company_id;
        contact.contact_type = ct.contact_type;
        contact.email = ct.email;
        contact.first_name = ct.first_name;
        contact.id = ct.id;
        contact.mobile = ct.mobile;
        contact.last_name = ct.surname;
        contact.uid = ct.uid;
        contact.role = ct.role;
        contactList.push(contact);
      });
    }
    return contactList;
  }
}
