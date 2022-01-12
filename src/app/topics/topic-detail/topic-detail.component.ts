import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StudySession } from 'src/app/_models/study-session';
import { StudySessionService } from 'src/app/_services/study-session.service';
import { Topic } from '../../_models/topic';
import { TopicService } from '../../_services/topic.service';

@Component({
  selector: 'app-topic-detail',
  templateUrl: './topic-detail.component.html',
  styleUrls: ['./topic-detail.component.css']
})
export class TopicDetailComponent implements OnInit {
  topic = new Topic('');

  studySessionIdDeleted: number = -1;

  constructor(private modalService: NgbModal, private route: ActivatedRoute, private router: Router, private topicService: TopicService,
    private studySessionService: StudySessionService) {
  }

  openModal(content: any, session: StudySession): void {
    this.modalService.open(content, { centered: true });
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
        this.modalService.dismissAll();
      },
      error: (error) => console.log(error)
    });
  }

}
