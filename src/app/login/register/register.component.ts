import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/_models/user';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User = new User();

  nameFormControl = new FormControl(null, Validators.required);
  emailFormControl = new FormControl(null, Validators.email);
  passwordFormControl = new FormControl(null, Validators.minLength(4));

  returnUrl?: string;
  error?: string;

  constructor(private route: ActivatedRoute, private router: Router, private authenticationService: AuthenticationService,
    private userService: UserService) {
    if (this.authenticationService.currentUserValue.token) {
      this.router.navigate(['/projects']);
    }
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/projects';
  }

  isValidFields(): boolean {
    return this.nameFormControl.valid && this.emailFormControl.valid && this.passwordFormControl.valid;
  }

  register() {
    this.userService.register(this.user)
      .subscribe({
        next: () => {
          this.router.navigate(['login'], {
            queryParams: {
              action: 'firstLogin'
            }
          });
        },
        error: (error) => this.error = error
      });
  }

}
