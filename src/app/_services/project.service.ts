import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from '../_models/subject';
import { Project } from '../_models/project';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private baseUrl = environment.REST_API_URL + '/projects';

  constructor(private http: HttpClient) { }

  addProject(project: Project): Observable<Project> {
    return this.http.post<Project>(this.baseUrl, project);
  }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.baseUrl);
  }

  getProject(id: number): Observable<Project> {
    return this.http.get<Project>(this.baseUrl + '/' + id);
  }

  getProjectSubjects(project: Project): Observable<Subject[]> {
    return this.http.get<Subject[]>(this.baseUrl + '/' + project.id + '/subjects');
  }

}
