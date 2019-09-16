import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/shared/services/services.service';
import { IServices } from 'src/app/shared/interfaces/services.interface';
import { NewServices } from 'src/app/shared/classes/new-services.class';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-admin-services',
  templateUrl: './admin-services.component.html',
  styleUrls: ['./admin-services.component.css'],
  providers: [ServicesService,NgbModalConfig, NgbModal]
})
export class AdminServicesComponent implements OnInit {
  adminServices: Array<IServices> = [];
  servicesProcedures: string;
  servicesDescriptions: string;
  servicesPrice1: number;
  servicesPrice2: number;
  servicesPrice3: number;
  servicesMark: number;
  editStatus: boolean = false;
  editID: number;

  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadState: Observable<string>;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;
  image: string = '';

  constructor(private servicesService: ServicesService, private afStorage: AngularFireStorage,config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
   }
   open(content) {
    this.modalService.open(content);
  }
  ngOnInit() {
    // this.adminServices = this.servicesService.getData();
    this.getServices();
  }
  private getServices(): void {
    this.servicesService.getServices().subscribe(
      data => {
        this.adminServices = data;
      },
      err => {
        console.log(err)
      }
    )
  }
  public isAddServices(): void {
    const newService: IServices = new NewServices(
      0,
      this.servicesProcedures,
      this.servicesDescriptions,
      this.servicesPrice1,
      this.servicesPrice2,
      this.servicesPrice3,
      this.servicesMark,
      this.image,

    );
    newService.id = this.adminServices.slice(-1)[0].id + 1;
    this.servicesProcedures = '';
    this.servicesDescriptions = '';
    this.servicesPrice1 = null;
    this.servicesPrice2 = null;
    this.servicesPrice3 = null;
    this.servicesMark = null;
    this.image = '';

    //відправка даних на сервіс
    this.servicesService.addServices(newService).subscribe(
      () => {
        this.getServices();
      }
    )
  }
  public isDeleteServices(service: IServices): void {
    const id = service.id;
    if (confirm('You are sure?')) {
      if (this.adminServices.length < 2) {
        alert('The last component cannot be deleted !!!')
      }
      else {
        this.servicesService.delServices(id).subscribe(
          () => {
            this.getServices();
          })
      }
    }
  }
  public isEditServices(service: IServices): void {
    this.editStatus = true;
    this.servicesProcedures = service.name;
    this.servicesDescriptions = service.description;
    this.servicesPrice1 = service.price1;
    this.servicesPrice2 = service.price2;
    this.servicesPrice3 = service.price3;
    this.servicesMark = service.mark;
    this.image = service.image;
    this.editID = service.id;
  }
  public isSaveEditServices(): void {
    const newService: IServices = new NewServices(
      this.editID,
      this.servicesProcedures,
      this.servicesDescriptions,
      this.servicesPrice1,
      this.servicesPrice2,
      this.servicesPrice3,
      this.servicesMark,
      this.image,

    );
    this.servicesProcedures = '';
    this.servicesDescriptions = '';
    this.servicesPrice1 = null;
    this.servicesPrice2 = null;
    this.servicesPrice3 = null;
    this.image = '';
    this.servicesMark = null;
    this.servicesService.editServices(newService).subscribe(() => {
      this.getServices();
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

  public closeModal(): void {
    this.servicesProcedures = '';
    this.servicesDescriptions = '';
    this.servicesPrice1 = null;
    this.servicesPrice2 = null;
    this.servicesPrice3 = null;
    this.servicesMark = null;
    this.image = '';
    this.editStatus = false;
  }


}
