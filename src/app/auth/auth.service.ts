import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface AuthData {
  email: string;
  password: string;
}

@Injectable({providedIn: 'root'})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  createUser(email: string, password: string) {
    const authData: AuthData = { email, password };

    this.httpClient.post('http://localhost:3000/api/user/signup', authData)
      .subscribe(res => {

      });
  }

  login(email: string, password: string) {
    const authData: AuthData = { email, password };
    this.httpClient.post('http://localhost:3000/api/user/signup', authData)
      .subscribe(res => {
        
      });
  }
}
