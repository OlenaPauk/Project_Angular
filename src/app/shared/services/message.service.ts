import { Injectable } from '@angular/core';
import { IMessage } from '../interfaces/message.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private data: Array<IMessage> = [
    {
      id: 1,
      name: "Lisa",
      email: "lisa@gmail.com",
      message: 'Good!'
    },
    {
      id: 2,
      name: "Lisa",
      email: "lisa@gmail.com",
      message: 'Good!'
    }
  ];
  private url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000/messages'
  }

  getData(): Array<IMessage> {
    return this.data;
  }
  public getMessage(): Observable<Array<IMessage>> {
    return this.http.get<Array<IMessage>>(this.url)
  }
  public addMess(message: IMessage): Observable<Array<IMessage>> {
    return this.http.post<Array<IMessage>>(this.url,message);
  }
  public delMess(id: number):Observable<Array<IMessage>>{
    return this.http.delete<Array<IMessage>>(`${this.url}/${id}`)
  }

}
