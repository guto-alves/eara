import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { ProjectDetailComponent } from './projects/project-detail/project-detail.component';
import { ProjectsComponent } from './projects/projects/projects.component';
import { AddStudySessionComponent } from './topics/add-study-session/add-study-session.component';
import { TopicDetailComponent } from './topics/topic-detail/topic-detail.component';
import { AuthGuard } from './_utils/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },

  { path: '', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'projects', component: ProjectsComponent, canActivate: [AuthGuard] },
  { path: 'projects/:id', component: ProjectDetailComponent, canActivate: [AuthGuard] },
  { path: 'topic/:id', component: TopicDetailComponent, canActivate: [AuthGuard] },
  { path: 'topic/:id/session', component: AddStudySessionComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'projects' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
