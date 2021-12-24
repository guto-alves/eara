import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../_services/project.service';
import { FormsModule } from '@angular/forms';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { RouterModule } from '@angular/router';
import { ProjectsComponent } from './projects/projects.component';



@NgModule({
  declarations: [
    ProjectsComponent,
    ProjectDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  providers: [
    ProjectService
  ]
})
export class ProjectsModule { }
