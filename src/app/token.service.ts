import { Injectable } from '@angular/core';


const ACCESS_TOKEN_KEY = 'access_token';
@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  setToken(token: string) {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
  }

  getToken() {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  }

  clear() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  }

}
