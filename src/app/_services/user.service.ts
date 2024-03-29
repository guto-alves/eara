import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Account } from '../_models/account';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = environment.REST_API_URL + '/users';

  constructor(private http: HttpClient) { }

  register(user: User): Observable<User> {
    return this.http.post<User>(this.baseUrl, user);
  }

  getLoggedInUser(): Observable<User> {
    return this.http.get<User>(this.baseUrl + '/me');
  }

  updateUser(user: User): Observable<void> {
    return this.http.put<void>(this.baseUrl, user);
  }

  changePassword(account: Account) {
    return this.http.post<void>(this.baseUrl + '/change-password', account);
  }

}
