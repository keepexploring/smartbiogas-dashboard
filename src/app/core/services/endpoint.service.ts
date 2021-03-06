import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable()
export class EndpointService {
  private static baseUrl = environment.baseUrl;
  private static basePath = 'api/v1/';

  public static baseUri = EndpointService.baseUrl + EndpointService.basePath;

  token = EndpointService.baseUrl + 'o/token/';
  validateToken = this.fullApiEndpoint('validate/validate_code/');

  technicians = {
    index: this.fullApiEndpoint(`users/?format=json&limit=${environment.apiPageLimit}`),
    single: this.fullApiEndpoint(`users/`),
    create: this.fullApiEndpoint(`users/create_technician/`),
  };

  dashboard = {
    index: this.fullApiEndpoint(`dashboard/?format=json&limit=${environment.apiPageLimit}`),
    cards: this.fullApiEndpoint(`data/get_cards/`),
    templateCards: this.fullApiEndpoint(`data/get_template_cards/`),
    addCard: this.fullApiEndpoint(`data/add_card_to_dashboard/`),
    modifyCardOrder: this.fullApiEndpoint(`data/modify_card_order/`),
  };

  plants = {
    index: this.fullApiEndpoint(`biogasplants/?format=json&limit=${environment.apiPageLimit}`),
    single: this.fullApiEndpoint(`biogasplants/`),
  };

  jobs = {
    index: this.fullApiEndpoint(`jobs/?format=json&limit=${environment.apiPageLimit}`),
    user: this.fullApiEndpoint(`jobs/?limit=${environment.apiPageLimit}&fixers__user__id=`),
    plant: this.fullApiEndpoint(`jobs/?limit=${environment.apiPageLimit}&plant__id=`),
    single: this.fullApiEndpoint(`jobs/`),
  };

  countryData = this.fullApiEndpoint('data/get_countries_and_mobile_shortcodes/');

  getOffset(page: number, itemsPerPage: number): string {
    if (page > 0) {
      page = page - 1;
    }
    const offset = '&offset=' + page * itemsPerPage;
    return offset;
  }

  private fullApiEndpoint(path): string {
    return EndpointService.baseUri + path;
  }
}
