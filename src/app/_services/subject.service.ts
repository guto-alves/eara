import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Topic } from '../_models/topic';
import { Subject } from '../_models/subject';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  private baseUrl = environment.apiUrl + '/subjects';

  constructor(private http: HttpClient) { }

  addSubject(subject: Subject): Observable<Subject> {
    return this.http.post<Subject>(this.baseUrl, subject);
  }

  addTopic(subjectId: number, topic: Topic): Observable<Topic> {
    return this.http.post<Topic>(this.baseUrl + '/' + subjectId + '/topics', topic);
  }
}
