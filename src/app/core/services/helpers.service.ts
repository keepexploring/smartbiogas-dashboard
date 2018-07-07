import { throwError, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { TokenService } from '../../auth/services/token.service';

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
}
