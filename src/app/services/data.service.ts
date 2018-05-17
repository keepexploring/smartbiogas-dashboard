// Service for component communication
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Subject } from "rxjs";

@Injectable()
export class DataService {
  private subject = new Subject<any>();

  userAuthenticated(message: boolean) {
    this.subject.next(message);
  }

  sendData(message: string) {
    this.subject.next(message);
  }

  clearData() {
    this.subject.next();
  }

  getData(): Observable<any> {
    return this.subject.asObservable();
  }
}
