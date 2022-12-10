import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  private baseUrl = "http://localhost:8080/api/statuses";

  constructor(private http: HttpClient) { }

  getArrivalStatuses(): Observable<any>{
    return this.http.get<any>(this.baseUrl+'/search/getByArrivalTrue');
  }

}
