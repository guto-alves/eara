import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/_models/project';
import { Subject } from 'src/app/_models/subject';
import { Topic } from 'src/app/_models/topic';
import { ProjectService } from 'src/app/_services/project.service';
import { SubjectService } from 'src/app/_services/subject.service';

declare var $: any;

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {
  project: Project = new Project();
  subjects: Subject[] = [];

  constructor(private router: Router, private route: ActivatedRoute,
    private subjectService: SubjectService, private projectService: ProjectService) {
  }

  ngOnInit(): void {
    const projectId = this.route.snapshot.paramMap.get('id');

    if (projectId != null) {
      this.projectService.getProject(parseInt(projectId)).subscribe({
        next: (project) => {
          this.project = project;

          this.projectService.getProjectSubjects(project).subscribe({
            next: (subjects) => this.subjects = subjects,
            error: (e) => console.log(e),
          });
        }
      });
    }
  }

  addSubject(): void {
    let newSubjectEl: any = $('.accordion-item-base');

    $(newSubjectEl).find('.new-subject-name-input').keyup((event: any) => {
      if (event.which == 13) {
        let subject = new Subject($(event.target).val());
        subject.project = this.project;

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
