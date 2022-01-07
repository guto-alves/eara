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

  showSubjectForm = false;

  constructor(private router: Router, private route: ActivatedRoute,
    private projectService: ProjectService, private subjectService: SubjectService) {
  }

  ngOnInit(): void {
    const projectId = this.route.snapshot.paramMap.get('id');

    if (projectId != null) {
      this.projectService.getProject(parseInt(projectId)).subscribe({
        next: (project) => {
          this.project = project;

          localStorage.setItem('color', this.project.color || '#0d6efd');
          $('nav').attr('style', `background-color: ${project.color} !important`);

          this.projectService.getProjectSubjects(project).subscribe({
            next: (subjects) => this.subjects = subjects,
            error: (e) => console.log(e)
          });
        },
        error: (e) => this.router.navigate(['/projects'])
      });
    }
  }

  addSubject(subjectName: string): void {
    const subject = new Subject(subjectName);
    subject.project = this.project;

    this.subjectService.addSubject(subject).subscribe({
      next: (newSubject) => {
        this.subjects.push(newSubject);
        this.showSubjectForm = true;
      },
      error: (error) => console.log(error)
    });
  }

  addTopic(topicName: string, subjectId: number): void {
    const topic = new Topic(topicName);

    this.subjectService.addTopic(subjectId, topic).subscribe({
      next: (newTopic) => {
        const subject = this.subjects.find((s) => s.id == subjectId);
        subject?.topics.push(newTopic);
      },
      error: (error) => console.log(error)
    });
  }

}
