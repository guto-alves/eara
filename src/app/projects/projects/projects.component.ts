import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';
import { Project } from '../../_models/project';
import { ProjectService } from '../../_services/project.service';

declare const $: any;

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = []
  project: Project = new Project();

  constructor(private router: Router, private userService: UserService, private projectService: ProjectService) { }

  ngOnInit(): void {
    this.projectService.getProjects().subscribe({
      next: (projects) => this.projects = projects,
      error: (e) => console.log(e)
    });
  }

  addProject(): void {
    if (this.isLightColor(this.project.color)) {
      this.showErrorAlert('Escolha uma cor uma pouco mais escura!');
      return;
    }

    this.projectService.addProject(this.project).subscribe({
      next: (project) => {
        this.projects.push(project);
        $('#newProjectModal .alert').hide();
        $('#newProjectModal').modal('toggle');
      },
      error: (e) => {
        console.log(e);
        this.showErrorAlert('Erro ao criar projeto. Verifique os campos e tente novamente!');
      }
    });
  }

  goToProject(projectId: number): void {
    this.router.navigate(['projects/' + projectId]);
  }

  private showErrorAlert(message: string): void {
    $('#newProjectModal #alertMessage').text(message);
    $('#newProjectModal .alert').show();
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
