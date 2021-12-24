import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopicDetailComponent } from './topic-detail/topic-detail.component';
import { TopicService } from '../_services/topic.service';
import { AddStudySessionComponent } from './add-study-session/add-study-session.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TopicDetailComponent,
    AddStudySessionComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  providers: [TopicService]
})
export class TopicsModule { }
