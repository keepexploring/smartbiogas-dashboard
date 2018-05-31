import { EndpointService } from '../services/endpoint.service';
import { Subject } from 'rxjs';

export class User {
  id: number;
  first_name: string;
  last_name: string;
  phone_number: string;
  status: boolean;
  company_name: string;
  contact_type: string;
  email: string;
  resource_uri: string;

  role: string;

  constructor(private user?: Partial<User>) {
    Object.assign(this, user);
    this.resource_uri = this.resource_uri ? EndpointService.baseUri + this.resource_uri : '';
  }

  fullName = (): string => {
    const first: string = this.first_name ? this.first_name : 'Unknown';
    const last: string = this.last_name ? this.last_name : 'Unknown';
    return `${first} ${last}`;
  };
}
