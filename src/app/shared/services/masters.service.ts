import { Injectable } from '@angular/core';
import { IMasters } from '../interfaces/masters.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MastersService {
  private data: Array<IMasters> = [
    {
      id: 3,
      name: "Miss Pat",
      fullName: "Luh Putu Shriwardani",
      age: 43,
      sertificate: "Work experience - 2 years in Thailand. In addition to his professional skills, Pat invests a part of his soul during a massage session. The master is focused on the result of maximum comfort for you. Pat knows how to relieve you of back pain and make massage beneficial to your body. Taking into account your benefits will help you relax and recharge.",
      image: "https://firebasestorage.googleapis.com/v0/b/spasalon-1c81e.appspot.com/o/images%2F4rfbwiw29ps?alt=media&token=9af7cbc9-1413-4f0b-a451-67ae058d9d43",
      mark: 4.8
    }
  ];
  private url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000/masters';
  }
  getData(): Array<IMasters> {
    return this.data;
  }
  public getMasters(): Observable<Array<IMasters>> {
    return this.http.get<Array<IMasters>>(this.url);
  }
  public addMasters(master: IMasters): Observable<Array<IMasters>> {
    return this.http.post<Array<IMasters>>(this.url, master);
  }
  public delMasters(id: number): Observable<Array<IMasters>> {
    return this.http.delete<Array<IMasters>>(`${this.url}/${id}`)
  }
  public editMasters(master: IMasters): Observable<Array<IMasters>> {
    return this.http.put<Array<IMasters>>(`${this.url}/${master.id}`, master);

  }
}
