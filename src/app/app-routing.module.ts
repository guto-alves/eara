import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubjectListComponent } from './subjects/subject-list/subject-list/subject-list.component';
import { AddStudySessionComponent } from './topics/add-study-session/add-study-session.component';
import { TopicDetailComponent } from './topics/topic-detail/topic-detail.component';

const routes: Routes = [
  { path: 'subjects', component: SubjectListComponent },
  { path: 'topic/:id', component: TopicDetailComponent },
  { path: 'topic/:id/session', component: AddStudySessionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
