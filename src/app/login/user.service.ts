import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  register(user: User): Observable<User> {
    return this.http.post<User>(environment.apiUrl + '/users', user);
  }

  getLoggedInUser(): Observable<User> {
    return this.http.get<User>(environment.apiUrl + '/users/me');
  }

}
