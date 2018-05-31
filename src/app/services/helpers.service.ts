import { throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { User } from '../models/user';
import { TokenService } from './token.service';
import { ApiResponseMeta } from '../models/api-response-meta';

import { environment } from '../../environments/environment';

@Injectable()
export class HelpersService {
  constructor(private tokenService: TokenService) {}

  handleUpdatesAndAdditions = (received: any, list: any[]): any[] => {
    list = list instanceof Array ? list : [];
    list = this.addToList(received, list);
    list = this.updateList(received, list);
    return list;
  };

  addToList = (received: any, list: any[]) => {
    if (!(received instanceof Array) && !this.inList(received, list)) {
      list.push(received);
      return list;
    }
    return list.concat(received.filter(item => !this.inList(item, list)));
  };

  updateList = (received: any, list: any[]): any[] => {
    if (!(received instanceof Array)) {
      if (this.inList(received, list) && !this.areItemsEqual(received, list)) {
        const index = list.findIndex(i => i.id === received.id);
        list[index] = received;
      }
      return list;
    }

    const itemsToUpdate: any[] = received.filter(item => this.inList(item, list)) || [];

    if (itemsToUpdate.length === 0) {
      return list;
    }

    return list.map(itemInList => {
      const i = itemsToUpdate.findIndex(i => i.id === itemInList.id);
      return i === -1
        ? itemInList
        : this.areItemsEqual(itemsToUpdate[i], itemInList)
          ? itemInList
          : itemsToUpdate[i];
    });
  };

  private areItemsEqual(received: any, existing: any) {
    const receivedStr = JSON.stringify(received, Object.keys(received).sort());
    const existingStr = JSON.stringify(existing, Object.keys(existing).sort());
    if (receivedStr === existingStr) {
      return true;
    }
    return false;
  }

  private inList(received: any, list: any[]): boolean {
    const index = list.findIndex(t => t.id === received.id);
    return index > -1;
  }

  handleResponseError(error: Response | any) {
    let errMsg: string = '';
    if (error instanceof Response) {
      if (error.status === 401) {
        return this.tokenService.handleUnauthorisedError(error);
      }
      const body: any = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      if (error.error && error.error.error_description) {
        errMsg = error.error.error_description;
      } else {
        errMsg = error.message ? error.message : error.toString();
      }
    }
    return throwError(errMsg);
  }

  parseContactFromJsonData(contactData: {
    user_id;
    company_name;
    contact_type;
    first_name;
    last_name;
    phone_number;
    role;
    status;
  }): User {
    let contact = new User();
    contact.id = contactData.user_id;
    contact.contact_type = contactData.contact_type;
    contact.first_name = contactData.first_name;
    contact.last_name = contactData.last_name;
    contact.phone_number = contactData.phone_number;
    contact.role = contactData.role;
    contact.status = contactData.status;

    if (contactData.company_name) {
      contact.company_name = contactData.company_name[0];
    }

    return contact;
  }

  calculateTotalApiPages(totalItems: number, itemsPerPage: number): number {
    console.log('TODO [helpers calculateTotalApiPages]: Use the one in model instead');
    return Math.ceil(totalItems / itemsPerPage);
  }

  prefetch(totalPages: number, page: number, callback: Function) {
    if (totalPages <= environment.apiPagesToPrefetch) {
      const newPage = page + 1;
      if (newPage <= totalPages) {
        callback(page + 1);
      }
    }
  }
}
