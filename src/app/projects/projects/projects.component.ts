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
    if (this.isLightColor(this.project.color)) {
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

  isLightColor(c: string): boolean {
    c = c.substring(1);      // strip #
    let rgb = parseInt(c, 16);   // convert rrggbb to decimal
    let r = (rgb >> 16) & 0xff;  // extract red
    let g = (rgb >> 8) & 0xff;  // extract green
    let b = (rgb >> 0) & 0xff;  // extract blue

    const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

    return luma > 200;
  }

}
