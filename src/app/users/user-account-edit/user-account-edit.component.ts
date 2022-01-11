import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from 'src/app/_models/account';
import { User } from 'src/app/_models/user';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-user-account-edit',
  templateUrl: './user-account-edit.component.html',
  styleUrls: ['./user-account-edit.component.css']
})
export class UserAccountEditComponent implements OnInit {
  account: Account;

  alertErrorMessage = '';
  alertSuccessMessage = '';

  constructor(private router: Router, private userService: UserService, private authService: AuthenticationService) {
    const currentUser = this.authService.currentUserValue;

    this.account = {
      email: currentUser.email
    };
  }

  ngOnInit(): void {
  }

  updatePassword(): void {
    this.alertSuccessMessage = '';
    this.alertErrorMessage = '';

    this.userService.changePassword(this.account).subscribe({
      next: () => {
        this.alertErrorMessage = '';
        this.alertSuccessMessage = 'Senha atualizada com sucesso';
      },
      error: (error) => {
        this.alertSuccessMessage = '';
        this.alertErrorMessage = error;
      }
    });
  }

}
