import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './_models/user';
import { AuthenticationService } from './_services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
  currentUser: User;
  isAuthenticated: boolean = false;

  constructor(private router: Router, private authenticationService: AuthenticationService) {
    this.currentUser = this.authenticationService.currentUserValue;

    authenticationService.currentUser.subscribe({
      next: (user) => {
        this.currentUser = user;
        this.isAuthenticated = this.currentUser != null;
      },
    });
  }

  ngOnInit(): void {

  }

  logout(): void {
    this.authenticationService.logout();
  }
}
