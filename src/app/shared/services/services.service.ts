import { Injectable } from '@angular/core';
import { IServices } from '../interfaces/services.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  private data: Array<IServices> = [
    {
      id: 4,
      name: "Balinese hand massage",
      description: "This massage helps to get rid of tension, pain and improves blood circulation, your skin will look fresher and better. Our therapists use reflexology to increase the effectiveness of your hand massage. This can be a great way to increase the health benefits of it. This massage is especially good in combination with other procedures.",
      price1: 480,
      price2: 670,
      price3: 900,
      image: "https://firebasestorage.googleapis.com/v0/b/spasalon-1c81e.appspot.com/o/images%2Fcyv2wt784tn?alt=media&token=5b43bd7f-2718-425d-bafc-2709f3c05e52",
      mark: 4.5
    }
  ]
  private url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000/services'
  }

  getData(): Array<IServices> {
    return this.data;
  }

  public getServices(): Observable<Array<IServices>> {
    return this.http.get<Array<IServices>>(this.url);
  }
  public addServices(service: IServices): Observable<Array<IServices>> {
    return this.http.post<Array<IServices>>(this.url, service)
  }
  public delServices(id: number): Observable<Array<IServices>> {
    return this.http.delete<Array<IServices>>(`${this.url}/${id}`)
  }
  public editServices(service: IServices): Observable<Array<IServices>> {
    return this.http.put<Array<IServices>>(`${this.url}/${service.id}`, service)
  }
}

