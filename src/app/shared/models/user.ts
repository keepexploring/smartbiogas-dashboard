export class User {
  id: number;
  first_name: string;
  last_name: string;
  mobile: string;
  status: boolean;
  company_name: string[];
  contact_type: string;
  email: string;
  resource_uri: string;
  role: string;

  get fullName(): string {
    const first: string = this.first_name ? this.first_name : 'Unknown';
    const last: string = this.last_name ? this.last_name : 'Unknown';
    return `${first} ${last}`;
  }
}
