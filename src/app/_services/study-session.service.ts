import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StudySession } from '../_models/study-session';

@Injectable({
  providedIn: 'root'
})
export class StudySessionService {
  private baseUrl = environment.REST_API_URL + '/sessions';

  constructor(private http: HttpClient) { }

  getStudySession(id: number): Observable<StudySession> {
    return this.http.get<StudySession>(this.baseUrl + '/' + id);
  }

  updateStudySession(session: StudySession): Observable<StudySession> {
    return this.http.put<StudySession>(this.baseUrl + '/' + session.id, session);
  }

  deleteStudySession(id: number): Observable<void> {
    return this.http.delete<void>(this.baseUrl + '/' + id);
  }
}
