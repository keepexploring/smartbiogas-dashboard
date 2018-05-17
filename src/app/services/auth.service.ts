import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map, tap, catchError, delay, retry } from "rxjs/operators";

import { Token } from "../models/token";
import { HelpersService } from "./helpers.service";
import { EndpointService } from "./endpoint.service";

@Injectable()
export class AuthService {
  authenticated: boolean = false;

  constructor(
    private http: HttpClient,
    private helpers: HelpersService,
    private endpoints: EndpointService
  ) {}

  private httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      Accept: "application/json"
    })
  };

  login(username: string, password: string): Observable<Token> {
    return this.http
      .post(
        this.endpoints.token,
        this.getParams(username, password),
        this.httpOptions
      )
      .pipe(
        map(response => this.mapDataToModel(response)),
        retry(3),
        catchError(this.helpers.handleResponseError)
      );
  }

  logOut() {
    this.authenticated = false;
    localStorage.clear();
  }

  getToken() {
    return localStorage.getItem("token");
  }

  validateToken(): Observable<boolean> {
    if (!this.getToken()) {
      this.logOut();
      return of(false);
    }

    const token = this.getToken();
    return this.http
      .post(
        this.endpoints.validateToken,
        JSON.stringify({
          token: token
        }),
        {
          observe: "response"
        }
      )
      .pipe(
        map(response => {
          if (!response.ok) {
            this.logOut();
            return false;
          }
          this.authenticated = true;
          return true;
        }),
        retry(3),
        catchError(this.helpers.handleResponseError)
      );
  }

  private saveNewToken(token) {
    localStorage.clear();
    localStorage.setItem("token", token);
  }

  private getParams(username: string, password: string) {
    return JSON.stringify({
      username: username,
      password: password,
      grant_type: "password",
      client_id: "123456",
      client_secret: "123456"
    });
  }

  private mapDataToModel(response: any): Token {
    var token: Token = new Token();
    token.access_token = response.access_token;
    token.token_type = response.token_type;
    token.expires_in = response.expires_in;
    token.refresh_token = response.refresh_token;
    token.scope = response.scope;

    this.saveNewToken(token.access_token);

    return token;
  }
}
