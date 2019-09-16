import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IServices } from '../interfaces/services.interface';

@Injectable({
  providedIn: 'root'
})
export class ServiceDetailsService {
  private url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000/services';
  }
  public getServiceDetails(id:number):Observable<IServices>{
    return this.http.get<IServices>(`${this.url}/${id}`);
  }
}
