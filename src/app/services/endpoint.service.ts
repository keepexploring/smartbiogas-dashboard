import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class EndpointService {
  private baseUrl = environment.baseUrl;
  private basePath = 'api/v1/' ;
  
  token = this.baseUrl + 'o/token/';

  technicians: {index} =  {
    index: this.fullApiEndpoint('users/?format=json')
  }
  
  dashboard: {index} =  {
    index: this.fullApiEndpoint('Dashboard/?format=json')
  }

  plants: {index, jobs} = {
    index: this.fullApiEndpoint('biogasplants/?format=json'),
    jobs: this.fullApiEndpoint('jobs/?plant__id=')
  }
  
  jobs: {index, user} = {
    index: this.fullApiEndpoint('jobs/?format=json'),
    user: this.fullApiEndpoint('jobs/?fixers__user__id=')
  }

  constructor() { }

  private fullApiEndpoint(path): string {
    return this.baseUrl + this.basePath + path;
  }

}
