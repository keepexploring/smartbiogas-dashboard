import { User } from '../../shared/models/user';

export class BiogasPlantContact extends User {
  associated_company_id: string;
  email: string;
  uid: string;
}
