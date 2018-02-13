import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';

import { environment } from '../../environments/environment';
import { Token } from '../models/token';
import { HelpersService } from './helpers.service';

@Injectable()
export class AuthService {

  private baseUrl = environment.baseUrl + 'o/token/';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json'
    })
  };

  constructor(private http: HttpClient, private helpers: HelpersService) { }

  login(username: string, password: string): Observable<Token> {
    return this.http.post(
        this.baseUrl,
        this.getParams(username, password),
        this.httpOptions
    )
    .map(response => this.extractTokenFromJson(response))
    .catch(this.helpers.handleResponseError);
  }

  logOut() {
    localStorage.clear();
  }

  getToken() {
    return localStorage.getItem('token');
  }
  
  isAuthenticated(): boolean {
    return this.getToken() ? true : false;
  }

  private saveNewToken(token) {
    localStorage.clear();
    localStorage.setItem('token', token);
  }

  private getParams(username: string, password: string) {
    return new HttpParams()
    .append('grant_type', 'password')
    .append('client_id', '123456')
    .append('client_secret', '123456')
		.append('username', username)
		.append('password', password);
  }

  private extractTokenFromJson(response: any): Token {
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
