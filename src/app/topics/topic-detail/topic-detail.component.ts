import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Topic } from '../../_models/topic';
import { TopicService } from '../../_services/topic.service';

@Component({
  selector: 'app-topic-detail',
  templateUrl: './topic-detail.component.html',
  styleUrls: ['./topic-detail.component.css']
})
export class TopicDetailComponent implements OnInit {
  topic: Topic;

  constructor(private route: ActivatedRoute, private router: Router, private topicService: TopicService) {
    //this.topic = {} as Topic;
    this.topic = new Topic('Adição');
  }

  ngOnInit(): void {
    const topicId = this.route.snapshot.paramMap.get('id');

    if (topicId != null) {
      this.topicService.getTopicById(parseInt(topicId)).subscribe({
        next: (topic) => {
          this.topic = topic;
        },
        error: (e) => console.log(e),
      });
    }

  }

}
