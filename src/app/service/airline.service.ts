import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Env } from '../environments/env';

@Injectable({
  providedIn: 'root'
})
export class AirlineService {

  private api = "/api/airlines";
  private baseUrl = Env.domain + this.api;

  constructor(private http: HttpClient) { }

  findAll(): Observable<any>{
    return this.http.get<any>(this.baseUrl+'?size=5000');
  }

  getById(id: number): Observable<any>{
    return this.http.get<any>(this.baseUrl+'/'+id);
  }

}
