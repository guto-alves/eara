import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { RegisterComponent } from './login/register/register.component';
import { ProjectDetailComponent } from './projects/project-detail/project-detail.component';
import { ProjectsComponent } from './projects/projects/projects.component';
import { AddStudySessionComponent } from './topics/add-study-session/add-study-session.component';
import { StudySessionEditComponent } from './topics/study-session-edit/study-session-edit.component';
import { TopicDetailComponent } from './topics/topic-detail/topic-detail.component';
import { UserProfileEditComponent } from './users/user-profile-edit/user-profile-edit.component';
import { AuthGuard } from './_utils/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: '', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'projects', component: ProjectsComponent, canActivate: [AuthGuard] },
  { path: 'projects/:id', component: ProjectDetailComponent, canActivate: [AuthGuard] },
  { path: 'topic/:id', component: TopicDetailComponent, canActivate: [AuthGuard] },
  { path: 'topic/:id/session', component: AddStudySessionComponent, canActivate: [AuthGuard] },
  { path: 'topic/:topicId/session/:sessionId/edit', component: StudySessionEditComponent, canActivate: [AuthGuard] },
  { path: 'user', component: UserProfileEditComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'projects' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
