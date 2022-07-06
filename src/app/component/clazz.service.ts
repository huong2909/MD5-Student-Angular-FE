import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Clazz} from '../model/Clazz';
const API_URL = 'http://localhost:8081/api/classes';
@Injectable({
  providedIn: 'root'
})
export class ClazzService {

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Clazz[]> {
    return this.httpClient.get<Clazz[]>(API_URL);
  }
}
