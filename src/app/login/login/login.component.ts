import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { User } from '../../_models/user';

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = new User();

  email = new FormControl(null, Validators.email);
  password = new FormControl(null, Validators.minLength(4));

  returnUrl?: string;
  error?: string;

  constructor(private route: ActivatedRoute, private router: Router, private authenticationService: AuthenticationService) {
    if (this.authenticationService.currentUserValue.token) {
      this.router.navigate(['/projects']);
    }
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/projects';

    if (this.route.snapshot.queryParams['action'] == 'firstLogin') {
      $('#successAlert').show();
    }
  }

  isValidFields(): boolean {
    return this.email.valid && this.password.valid;
  }

  login() {
    this.authenticationService.login(this.user.email, this.user.password)
      .subscribe({
        next: () => this.router.navigate([this.returnUrl]),
        error: (error) => this.error = error
      });
  }

}
