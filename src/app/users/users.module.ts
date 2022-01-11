import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileEditComponent } from './user-profile-edit/user-profile-edit.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    UserProfileEditComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgbAlertModule
  ]
})
export class UsersModule { }
