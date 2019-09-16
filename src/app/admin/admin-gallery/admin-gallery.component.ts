import { Component, OnInit } from '@angular/core';
import { GalleryService } from './../../shared/services/gallery.service';
import { IGallery } from './../../shared/interfaces/gallery.interface';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
import { NewGallery } from './../../shared/classes/new-gallery.class';
@Component({
  selector: 'app-admin-gallery',
  templateUrl: './admin-gallery.component.html',
  styleUrls: ['./admin-gallery.component.css'],
  providers: [GalleryService]
})
export class AdminGalleryComponent implements OnInit {
  adminGallery: Array<IGallery> = [];
  editStatus: boolean = false;
  editID: number;

  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadState: Observable<string>;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;
  image: string = '';


  constructor(private galleryService: GalleryService, private afStorage: AngularFireStorage) { }

  ngOnInit() {
    // this.adminGallery = this.galleryService.getData();
    this.getGallery();
  }
  private getGallery(): void {
    this.galleryService.getGallery().subscribe(
      data => {
        this.adminGallery = data;
      }, err => {
        console.log(err)
      }
    )
  }
  public isAddGallery(): void {
    const newGallery: IGallery = new NewGallery(
      0,
      this.image
    );
    newGallery.id = this.adminGallery.slice(-1)[0].id + 1;
    // this.image = null;
    //відправка даних на сервіс
    this.galleryService.addGallery(newGallery).subscribe(
      () => {
        this.getGallery();
      }
    )
  }

  public isDeleteGallery(gallery: IGallery): void {
    const id = gallery.id;
    if (confirm('You are sure?')) {
      if (this.adminGallery.length < 2) {
        alert('The last component cannot be deleted !!!')
      }
      else {
        this.galleryService.delGallery(id).subscribe(
          () => {
            this.getGallery();
          })
      }
    }

  }

  public isEditGallery(gallery: IGallery): void {
    this.editStatus = true;
    this.image = gallery.image;
    this.editID = gallery.id;
  }

  public isSaveEditGallery(): void {
    const newGallery: IGallery = new NewGallery(
      this.editID,
      this.image
    );
    this.galleryService.editGallery(newGallery).subscribe(() => {
      this.getGallery();
      this.image = '';
    })
    this.editStatus = false;
  }

  public upload(event): void {
    const id = Math.random().toString(36).substring(2);
    this.ref = this.afStorage.ref(`images/${id}`);
    this.task = this.ref.put(event.target.files[0]);
    this.uploadState = this.task.snapshotChanges().pipe(map(s => s.state));
    this.uploadProgress = this.task.percentageChanges();
    this.task.snapshotChanges().pipe(
      finalize(
        () => {
          this.downloadURL = this.ref.getDownloadURL();
          this.downloadURL.subscribe(url => this.image = url)
        })
    ).subscribe()
  }

}
