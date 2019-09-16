import { Injectable } from '@angular/core';
import { IGallery } from '../interfaces/gallery.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  private data: Array<IGallery>=[{
    id:1
  }]
private url: string;
  constructor(private http:HttpClient) {
    this.url = 'http://localhost:3000/gallery'
   }

  getData():Array<IGallery>{
    return this.data;
  }
  public getGallery():Observable<Array<IGallery>>{
    return this.http.get<Array<IGallery>>(this.url)
  }
  public addGallery(gal):Observable<Array<IGallery>>{
    return this.http.post<Array<IGallery>>(this.url,gal)
  }
  public delGallery(id:number):Observable<Array<IGallery>>{
    return this.http.delete<Array<IGallery>>(`${this.url}/${id}`)
  }
  public editGallery(gallery:IGallery):Observable<Array<IGallery>>{
    return this.http.put<Array<IGallery>>(`${this.url}/${gallery.id}`,gallery)
  }
}
