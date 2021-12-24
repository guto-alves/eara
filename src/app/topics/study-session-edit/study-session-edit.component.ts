import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudySession } from 'src/app/_models/study-session';
import { StudySessionService } from 'src/app/_services/study-session.service';
import { TopicService } from 'src/app/_services/topic.service';

@Component({
  selector: 'app-study-session-edit',
  templateUrl: './study-session-edit.component.html',
  styleUrls: ['./study-session-edit.component.css']
})
export class StudySessionEditComponent implements OnInit {
  studySession: StudySession;

  constructor(private route: ActivatedRoute, private router: Router, private topicService: TopicService,
    private studySessionService: StudySessionService) {
    this.studySession = new StudySession();
  }

  ngOnInit(): void {
    const sessionId = this.route.snapshot.paramMap.get('sessionId');

    if (sessionId != null) {
      this.studySessionService.getStudySession(parseInt(sessionId)).subscribe({
        next: (studySession) => this.studySession = studySession,
        error: (error) => console.log(error)
      });
    }
  }

  updateSession() {
    this.studySessionService.updateStudySession(this.studySession).subscribe({
      next: (t) => {
        this.router.navigate(['/topic/' + this.studySession.topic.id]);
      },
      error: (e) => console.log(e)
    });
  }

}
