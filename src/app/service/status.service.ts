import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Env } from '../environments/env';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  private api = "/api/statuses";
  private baseUrl = Env.domain + this.api;

  constructor(private http: HttpClient) { }

  getArrivalStatuses(): Observable<any>{
    return this.http.get<any>(this.baseUrl+'/search/getByArrivalTrue');
  }

}
