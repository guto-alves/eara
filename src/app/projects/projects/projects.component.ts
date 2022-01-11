import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbAlert, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Project } from '../../_models/project';
import { ProjectService } from '../../_services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = []
  project: Project = new Project();

  newProjectErrorMessage = '';

  constructor(private router: Router, private projectService: ProjectService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.projectService.getProjects().subscribe({
      next: (projects) => this.projects = projects,
      error: (e) => console.log(e)
    });
  }

  goToProject(projectId: number): void {
    this.router.navigate(['projects/' + projectId]);
  }

  openModal(content: any) {
    this.modalService.open(content, { centered: true });
  }

  addProject(): void {
    if (Project.isLightColor(this.project.color)) {
      this.newProjectErrorMessage = 'Escolha uma cor uma pouco mais escura!';
      return;
    }

    this.projectService.addProject(this.project).subscribe({
      next: (project) => {
        this.projects.push(project);
        this.modalService.dismissAll();
      },
      error: (error) => {
        this.newProjectErrorMessage = error;
      }
    });
  }

}
