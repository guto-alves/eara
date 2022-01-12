import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuillUtil } from 'src/app/_utils/quill-util';
import { StudySession } from '../../_models/study-session';
import { TopicService } from '../../_services/topic.service';

@Component({
  selector: 'app-add-study-session',
  templateUrl: './add-study-session.component.html',
  styleUrls: ['./add-study-session.component.css']
})
export class AddStudySessionComponent implements OnInit {
  studySession: StudySession;
  topicId: number = 0;

  modules = QuillUtil.modules;

  constructor(private route: ActivatedRoute, private router: Router, private topicService: TopicService) {
    this.studySession = new StudySession();
    this.studySession.totalTime = '01:00';
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id != null) {
      this.topicId = parseInt(id);
      this.studySession.topic.id = this.topicId;
    }
  }

  saveSession() {
    this.topicService.addStudySession(this.topicId, this.studySession).subscribe({
      next: (t) => {
        this.router.navigate(['/topic/' + this.topicId]);
      },
      error: (e) => console.log(e)
    });
  }

}
