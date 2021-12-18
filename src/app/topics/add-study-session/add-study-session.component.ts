import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudySession } from '../study-session';
import { TopicService } from '../topic.service';

@Component({
  selector: 'app-add-study-session',
  templateUrl: './add-study-session.component.html',
  styleUrls: ['./add-study-session.component.css']
})
export class AddStudySessionComponent implements OnInit {
  studySession: StudySession;
  topicId: number = 0

  constructor(private route: ActivatedRoute, private router: Router, private topicService: TopicService) {
    this.studySession = new StudySession();
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id != null) {
      this.topicId = parseInt(id);
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
