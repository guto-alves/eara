import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudySession } from 'src/app/_models/study-session';
import { StudySessionService } from 'src/app/_services/study-session.service';
import { Topic } from '../../_models/topic';
import { TopicService } from '../../_services/topic.service';

declare var $: any;

@Component({
  selector: 'app-topic-detail',
  templateUrl: './topic-detail.component.html',
  styleUrls: ['./topic-detail.component.css']
})
export class TopicDetailComponent implements OnInit {
  topic: Topic;

  private studySessionIdDeleted: number = -1;

  constructor(private route: ActivatedRoute, private router: Router, private topicService: TopicService,
    private studySessionService: StudySessionService) {
    this.topic = new Topic('');
  }

  ngOnInit(): void {
    const topicId = this.route.snapshot.paramMap.get('id');

    if (topicId != null) {
      this.topicService.getTopicById(parseInt(topicId)).subscribe({
        next: (topic) => this.topic = topic,
        error: (e) => console.log(e),
      });
    }
  }

  showDeleteConfirmModal(studySessionId: number) {
    this.studySessionIdDeleted = studySessionId;
    $('#confirmDeleteSessionModal').modal('toggle');
  }

  deleteStudySession() {
    this.studySessionService.deleteStudySession(this.studySessionIdDeleted).subscribe({
      next: () => {
        const studySessionIndex = this.topic.sessions.findIndex(session => session.id == this.studySessionIdDeleted);
        const st = this.topic.sessions[studySessionIndex];

        this.topic.sessions.splice(studySessionIndex, 1);
        this.topic.totalRightAnswers -= st.rightAnswers;
        this.topic.totalWrongAnswers -= st.wrongAnswers;

        const currenthh = parseInt(this.topic.totalTime.split(':')[0]);
        const currentmm = parseInt(this.topic.totalTime.split(':')[1]);

        const removedhh = parseInt(st.totalTime.split(':')[0]);
        const removedmm = parseInt(st.totalTime.split(':')[1]);

        this.topic.totalTime = (currenthh - removedhh).toLocaleString('en-US', {
          minimumIntegerDigits: 2,
          useGrouping: false
        }) + ':' + (currentmm - removedmm).toLocaleString('en-US', {
          minimumIntegerDigits: 2,
          useGrouping: false
        });

        this.studySessionIdDeleted = -1;

        $('#confirmDeleteSessionModal').modal('toggle');
      },
      error: (error) => console.log(error)
    });
  }

}
