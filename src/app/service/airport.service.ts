import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AirportService {

  private baseUrl = "http://localhost:8080/api/airports";

  constructor(private http: HttpClient) { }

  findAll(): Observable<any>{
    return this.http.get<any>(this.baseUrl+'?size=5000');
  }
  
}
