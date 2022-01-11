import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  projectUpdated: Project = new Project();

  subjects: Subject[] = [];

  showSubjectForm = false;

  newProjectErrorMessage = '';

  constructor(private router: Router, private route: ActivatedRoute,
    private projectService: ProjectService, private subjectService: SubjectService,
    private modalService: NgbModal) {
  }

  ngOnInit(): void {
    const projectId = this.route.snapshot.paramMap.get('id');

    if (projectId != null) {
      this.projectService.getProject(parseInt(projectId)).subscribe({
        next: (project) => {
          this.project = project;

          this.cloneProject(this.projectUpdated, project);

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

  openModal(content: any) {
    this.modalService.open(content, { centered: true });
  }

  updateProject(): void {
    if (Project.isLightColor(this.projectUpdated.color)) {
      this.newProjectErrorMessage = 'Escolha uma cor uma pouco mais escura!';
      return;
    }

    this.projectService.updateProject(this.projectUpdated).subscribe({
      next: () => {
        this.cloneProject(this.project, this.projectUpdated);
        this.modalService.dismissAll();
      },
      error: (e) => {
        this.newProjectErrorMessage = e;
      }
    });
  }

  private cloneProject(project1: Project, project2: Project) {
    project1.id = project2.id;
    project1.name = project2.name;
    project1.description = project2.description;
    project1.color = project2.color;
    localStorage.setItem('color', this.project.color || '#0d6efd');
    $('nav').attr('style', `background-color: ${this.project.color} !important`);
  }

}
