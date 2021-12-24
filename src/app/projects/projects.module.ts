import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../_services/project.service';
import { ProjectsComponent } from './projects/projects.component';
import { SubjectsModule } from '../subjects/subjects.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ProjectsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SubjectsModule
  ],
  providers: [
    ProjectService
  ]
})
export class ProjectsModule { }
