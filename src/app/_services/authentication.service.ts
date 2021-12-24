import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { User } from '../_models/user';
import { environment } from 'src/environments/environment';
import { AuthResult } from '../_models/auth-result';
import { UserService } from '../login/user.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient, private userService: UserService) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string): Observable<void> {
        return new Observable<void>((observer) => {
            const headers = new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${btoa('eara:eara')}`
            });

            const body = new URLSearchParams();
            body.set('username', username);
            body.set('password', password);
            body.set('grant_type', 'password');

            this.http.post<AuthResult>(`${environment.apiUrl}/oauth/token`, body, {
                headers: headers
            })
                .subscribe({
                    next: (result) => {
                        const user = new User();
                        user.token = result.access_token;
                        localStorage.setItem('currentUser', JSON.stringify(user));
                        this.currentUserSubject.next(user);

                        this.userService.getLoggedInUser().subscribe({
                            next: (user) => {
                                user.token = this.currentUserSubject.value.token;
                                this.currentUserSubject.next(user);
                                observer.next();
                            },
                            error: (error) => observer.error(error)
                        });

                        return result;
                    },
                    error: (error) => observer.error(error)
                });
        });
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(new User());
    }
}