import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Configuration } from 'app.constants';
import { Observable } from 'rxjs';
import { Answer } from 'models';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  private readonly apiPath = '/api/answer/';

  constructor(private http: HttpClient) { }

  add(answer: Answer): Observable<Answer> {
    return this.http.post(Configuration.Server + this.apiPath, Answer) as Observable<Answer>;
  }
}
