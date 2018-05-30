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
    let name = '';
    if (this.first_name) {
      name = this.first_name;
    }
    if (this.last_name) {
      name += ' ' + this.last_name;
    }

    if (name.length === 0) {
      return 'Unknown Unknown';
    }

    return name;
  }

  getStatus(): string {
    return this.status ? 'Active' : 'Inactive';
  }
}
