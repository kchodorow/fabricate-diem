import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { User } from './user';

@Injectable()
export class UserService {
  private userUrl: string = 'api/user';

  constructor(private httpClient: HttpClient) { }

  getUser() {
    const url = `${this.userUrl}/11`;
    return this.httpClient.get<User>(url);
  }
}
