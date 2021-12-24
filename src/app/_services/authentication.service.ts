import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { User } from '../_models/user';
import { environment } from 'src/environments/environment';
import { AuthResult } from '../_models/auth-result';
import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient, private userService: UserService) {
        if (localStorage.getItem('currentUser') != null) {
            this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
        } else {
            this.currentUserSubject = new BehaviorSubject<any>(null);
        }

        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): any {
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
                                localStorage.setItem('currentUser', JSON.stringify(user));
                                this.currentUserSubject.next(user);
                                observer.next();
                            },
                            error: (error) => observer.error(error)
                        });
                    },
                    error: (error) => observer.error(error)
                });
        });
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}