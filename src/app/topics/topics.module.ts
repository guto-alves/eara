import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopicDetailComponent } from './topic-detail/topic-detail.component';
import { TopicService } from '../_services/topic.service';
import { AddStudySessionComponent } from './add-study-session/add-study-session.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { StudySessionEditComponent } from './study-session-edit/study-session-edit.component';



@NgModule({
  declarations: [
    TopicDetailComponent,
    AddStudySessionComponent,
    StudySessionEditComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  providers: [TopicService]
})
export class TopicsModule { }
