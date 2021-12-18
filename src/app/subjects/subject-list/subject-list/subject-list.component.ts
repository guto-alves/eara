import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Topic } from 'src/app/topics/topic';
import { Subject } from '../../subject';
import { SubjectService } from '../../subject.service';

declare var $: any;

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.css']
})
export class SubjectListComponent implements OnInit {
  subjects: Subject[] = [];

  constructor(private subjectService: SubjectService, private router: Router) {
  }

  ngOnInit(): void {
    this.subjectService.getSubjects().subscribe({
      next: (subjects) => this.subjects = subjects,
      error: (e) => console.log(e),
    });
  }

  addSubject(): void {
    let newSubjectEl: any = $('.accordion-item-base');

    $(newSubjectEl).find('.new-subject-name-input').keyup((event: any) => {
      if (event.which == 13) {
        let subject = new Subject($(event.target).val());

        this.subjectService.addSubject(subject).subscribe({
          next: (newSubject) => this.subjects.push(newSubject)
        });

        $(newSubjectEl).hide();
      }
    });

    $(newSubjectEl).show();
  }

  addTopic(subjectId: number): void {
    const subject = this.subjects.find((s) => s.id == subjectId);

    if (subject != null) {
      const newTopicInput = $('[data-subject-id="' + subjectId + '"]').find('.new-topic-input:first');
      const topic: Topic = new Topic(newTopicInput.val());

      this.subjectService.addTopic(subjectId, topic).subscribe({
        next: (topic) => {
          subject?.topics.push(topic);
          newTopicInput.val('');
        },
        error: (e) => console.log(e)
      });
    }
  }
}


