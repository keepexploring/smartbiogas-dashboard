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

  handleUpdatesAndAdditions = (received: any[], existing: any[]): any[] => {
    const added = existing.concat(received.filter(item => this.existsInList(item, existing)));
    return this.updateExistingItems(received, added);
  };

  updateExistingItems = (received: any[], existing: any[]): any[] => {
    let itemsToUpdate: any[] = [];
    itemsToUpdate = received.filter(item => !this.existsInList(item, existing));

    if (itemsToUpdate.length === 0) {
      return existing;
    }

    const updatedList = existing.map(itemInList => {
      const itemReceived = itemsToUpdate.find(i => i.id === itemInList.id);
      if (itemReceived) {
        const receivedStr = JSON.stringify(itemReceived, Object.keys(itemReceived).sort());
        const existingStr = JSON.stringify(itemInList, Object.keys(itemInList).sort());
        if (receivedStr !== existingStr) {
          itemInList = itemReceived;
        }
      }
      return itemInList;
    });

    return updatedList;
  };

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

  existsInList(item, existing: any[]): boolean {
    return existing.find(t => t.id === item.id) === undefined;
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
