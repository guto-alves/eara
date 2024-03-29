import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { RegisterComponent } from './login/register/register.component';
import { ProjectDetailComponent } from './projects/project-detail/project-detail.component';
import { ProjectsComponent } from './projects/projects/projects.component';
import { StudySessionAddComponent } from './topics/study-session-add/study-session-add.component';
import { StudySessionEditComponent } from './topics/study-session-edit/study-session-edit.component';
import { TopicDetailComponent } from './topics/topic-detail/topic-detail.component';
import { UserAccountEditComponent } from './users/user-account-edit/user-account-edit.component';
import { UserProfileEditComponent } from './users/user-profile-edit/user-profile-edit.component';
import { AuthGuard } from './_utils/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: '', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'projects', component: ProjectsComponent, canActivate: [AuthGuard] },
  { path: 'projects/:id', component: ProjectDetailComponent, canActivate: [AuthGuard] },
  { path: 'topic/:id', component: TopicDetailComponent, canActivate: [AuthGuard] },
  { path: 'topic/:id/session', component: StudySessionAddComponent, canActivate: [AuthGuard] },
  { path: 'topic/:topicId/session/:sessionId/edit', component: StudySessionEditComponent, canActivate: [AuthGuard] },
  { path: 'user/edit-profile', component: UserProfileEditComponent, canActivate: [AuthGuard] },
  { path: 'user/edit-account', component: UserAccountEditComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'projects' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
