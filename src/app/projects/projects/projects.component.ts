import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from '../project';
import { ProjectService } from '../project.service';

declare var $: any;

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = []
  project: Project = new Project();

  constructor(private projectService: ProjectService, private router: Router) { }

  ngOnInit(): void {
    this.projectService.getProjects().subscribe({
      next: (projects) => this.projects = projects,
      error: (e) => console.log(e)
    });
  }

  addProject() {
    this.projectService.addProject(this.project).subscribe({
      next: (project) => {
        this.projects.push(project);
        $('#newProjectModal .alert').hide();
        $('#newProjectModal').modal('toggle');
      },
      error: (e) => {
        $('#newProjectModal .alert').show();
      }
    });
  }

  goToProject(projectId: number) {
    this.router.navigate(['projects/' + projectId]);
  }
}
