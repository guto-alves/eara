import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/_models/user';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-user-profile-edit',
  templateUrl: './user-profile-edit.component.html',
  styleUrls: ['./user-profile-edit.component.css']
})
export class UserProfileEditComponent implements OnInit {
  user: User;

  alertErrorMessage = '';
  alertSuccessMessage = '';

  constructor(private router: Router, private userService: UserService, private authService: AuthenticationService) {
    const currentUser = this.authService.currentUserValue;

    this.user = new User();
    this.user.name = currentUser.name;
    this.user.email = currentUser.email;
    this.user.token = currentUser.token;
  }

  ngOnInit(): void {
  }

  updateUser(): void {
    this.userService.updateUser(this.user).subscribe({
      next: () => {
        this.authService.updateCurrentUser(this.user);
        this.alertErrorMessage = '';
        this.alertSuccessMessage = 'Perfil atualizado com sucesso';
      },
      error: (error) => {
        this.alertSuccessMessage = '';
        this.alertErrorMessage = error;
      }
    });
  }

}
