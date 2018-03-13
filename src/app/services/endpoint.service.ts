import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class EndpointService {
  private baseUrl = environment.baseUrl;
  private basePath = 'api/v1/' ;

  token = this.baseUrl + 'o/token/';

  technicians: {index} =  {
    index: this.fullApiEndpoint('users/?format=json&limit=10')
  }

  dashboard: {index} =  {
    index: this.fullApiEndpoint('dashboard/?format=json&limit=10')
  }

  plants: {index, jobs} = {
    index: this.fullApiEndpoint('biogasplants/?format=json&limit=10'),
    jobs: this.fullApiEndpoint('jobs/?plant__id=')
  }

  jobs: {index, user} = {
    index: this.fullApiEndpoint('jobs/?format=json&limit=10'),
    user: this.fullApiEndpoint('jobs/?fixers__user__id=')
  }

  constructor() { }

  private fullApiEndpoint(path): string {
    return this.baseUrl + this.basePath + path;
  }

}
