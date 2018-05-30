export class User {
  id: number;
  company_name: string;
  contact_type: string;
  first_name: string;
  last_name: string;
  full_name: string = this.getFullName();
  phone_number: string;
  role: string;
  status: boolean;

  getFullName(): string {
    return this.first_name + ' ' + this.last_name;
  }

  getStatus(): string {
    return this.status ? 'Active' : 'Inactive';
  }
}
