import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StudySession } from './study-session';
import { Topic } from './topic';

@Injectable({
  providedIn: 'root'
})
export class TopicService {
  private baseUrl = 'http://localhost:8080/topics';
  constructor(private http: HttpClient) { }

  getTopicById(id: number): Observable<Topic> {
    return this.http.get<Topic>(this.baseUrl + '/' + id);
  }

  addStudySession(topicId: number, session: StudySession): Observable<StudySession> {
    return this.http.post<StudySession>(this.baseUrl + '/' + topicId + '/sessions', session);
  }
}
