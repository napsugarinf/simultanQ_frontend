import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Quiz } from '../_models/quiz.model';


const baseUrl = 'http://localhost:9001/api/quizzes';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  })
};


@Injectable({
  providedIn: 'root'
})
export class PlayquizService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(baseUrl)
  }
  getAllByUserId(userId: string) {
    return this.http.get(`${baseUrl}/userid/${userId}`);
  }

  getById(id: number) {
    return this.http.get(`${baseUrl}/id/${id}`)
  }

  getByPIN(pin: string) {
    return this.http.get(`${baseUrl}/pin/${pin}`)
  }

  getByPIN2(pin: string): Observable<Quiz> {
    return this.http.get<Quiz>(`${baseUrl}/pin/${pin}`);
  }
}
