import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubjectListComponent } from './subject-list/subject-list/subject-list.component';
import { RouterModule } from '@angular/router';
import { SubjectService } from '../_services/subject.service';


@NgModule({
  declarations: [
    SubjectListComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  providers: [SubjectService]
})
export class SubjectsModule { }
