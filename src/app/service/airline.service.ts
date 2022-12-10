import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AirlineService {

  private baseUrl = "http://localhost:8080/api/airlines";

  constructor(private http: HttpClient) { }

  findAll(): Observable<any>{
    return this.http.get<any>(this.baseUrl+'?size=5000');
  }

  getById(id: number): Observable<any>{
    return this.http.get<any>(this.baseUrl+'/'+id);
  }

}
