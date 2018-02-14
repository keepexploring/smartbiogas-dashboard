import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { User } from '../models/user';

@Injectable()
export class HelpersService {

  constructor() { }

  handleResponseError(error: Response | any) {
    // console.log("Error!", error);
    let errMsg: string = "";
    if (error instanceof Response) {
      const body: any = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      if(error.error && error.error.error_description) {
        errMsg = error.error.error_description;
      } else {
        errMsg = error.message ? error.message : error.toString();
      }
    }
    return Observable.throw(errMsg);
  }

  handleError(error: any) {
    console.log('error', error);
  }

  parseContactFromJsonData(contactData: {user_id, company_name, contact_type, first_name, last_name, phone_number, role, status}): User {
    let contact = new User();
    contact.id = contactData.user_id;
    contact.contact_type = contactData.contact_type;
    contact.first_name = contactData.first_name;
    contact.last_name = contactData.last_name;
    contact.phone_number = contactData.phone_number;
    contact.role = contactData.role;
    contact.status = contactData.status;
  
    if(contactData.company_name) { 
      contact.company_name = contactData.company_name[0]; 
    }
    
    return contact;
  }

}
