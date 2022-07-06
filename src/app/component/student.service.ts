import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Student} from '../model/Student';
const API_URL = 'http://localhost:8081/api/students';
@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private httpClient: HttpClient) { }
  getAll(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(API_URL);
  }
  save(student): Observable<Student> {
    return this.httpClient.post<Student>(API_URL, student);
  }
  getById(id): Observable<Student> {
    return  this.httpClient.get<Student>(API_URL + `/${id}`);
  }
  delete(id: number): Observable<Student> {
    return this.httpClient.delete<Student>(API_URL + `/${id}`);
  }
  update(id: number, student: Student): Observable<Student> {
    return this.httpClient.put<Student>(`${API_URL}/${id}`, student);
  }
  getByName(name): Observable<Student[]> {
    return  this.httpClient.get<Student[]>(API_URL + `/search-by-name?name=${name}`);
  }
  getByClazzId(id): Observable<Student[]> {
    return  this.httpClient.get<Student[]>(API_URL + `/clazz?id=${id}`);
  }
  getByScore(from, to): Observable<Student[]> {
    return  this.httpClient.get<Student[]>(API_URL + `/score-between?from=${from}&&to=${to}`);
  }
}
