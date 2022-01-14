import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopicDetailComponent } from './topic-detail/topic-detail.component';
import { TopicService } from '../_services/topic.service';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StudySessionEditComponent } from './study-session-edit/study-session-edit.component';
import { QuillModule } from 'ngx-quill';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { StudySessionAddComponent } from './study-session-add/study-session-add.component';


@NgModule({
  declarations: [
    TopicDetailComponent,
    StudySessionAddComponent,
    StudySessionEditComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDropdownModule,
    QuillModule.forRoot({
      modules: {
        syntax: true
      }
    })
  ],
  providers: [TopicService]
})
export class TopicsModule { }
