import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StudySession } from '../_models/study-session';
import { Topic } from '../_models/topic';

@Injectable({
  providedIn: 'root'
})
export class TopicService {
  private baseUrl = environment.REST_API_URL + '/topics';

  constructor(private http: HttpClient) { }

  getTopicById(id: number): Observable<Topic> {
    return this.http.get<Topic>(this.baseUrl + '/' + id);
  }

  addStudySession(topicId: number, session: StudySession): Observable<StudySession> {
    return this.http.post<StudySession>(this.baseUrl + '/' + topicId + '/sessions', session);
  }

}
