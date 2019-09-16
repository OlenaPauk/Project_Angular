import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IMasters } from '../interfaces/masters.interface';

@Injectable({
  providedIn: 'root'
})
export class MasterDetailsService {
  private url: string;
  
  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000/masters';
  }
  public getServiceDetails(id: number): Observable<IMasters> {
    return this.http.get<IMasters>(`${this.url}/${id}`);
  }
}
