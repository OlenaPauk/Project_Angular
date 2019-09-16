import { Component, OnInit } from '@angular/core';
import { MastersService } from 'src/app/shared/services/masters.service';
import { IMasters } from 'src/app/shared/interfaces/masters.interface';
import { NewMasters } from 'src/app/shared/classes/new-masters.class';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-admin-masters',
  templateUrl: './admin-masters.component.html',
  styleUrls: ['./admin-masters.component.css'],
  providers: [MastersService, NgbModalConfig, NgbModal]
})
export class AdminMastersComponent implements OnInit {
  adminMasters: Array<IMasters> = [];
  masterName: string;
  masterFullName: string;
  masterAge: number;
  masterSertificate: string;
  masterMark: number;
  editStatus: boolean = false;
  editID: number;

  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadState: Observable<string>;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;
  image: string = '';

  constructor(private mastersService: MastersService, private afStorage: AngularFireStorage, config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
  }
  open(content) {
    this.modalService.open(content);
  }
  ngOnInit() {
    // this.adminMasters = this.mastersService.getData();
    this.getMasters();
  }
  private getMasters(): void {
    this.mastersService.getMasters().subscribe(
      data => {
        this.adminMasters = data;
      },
      err => {
        console.log(err)
      }
    )
  }
  public isAddMaster(): void {
    const newMasters: IMasters = new NewMasters(
      0,
      this.masterName,
      this.masterFullName,
      this.masterAge,
      this.masterSertificate,
      this.masterMark,
      this.image,

    );
    newMasters.id = this.adminMasters.slice(-1)[0].id + 1;
    this.masterName = '';
    this.masterFullName = '';
    this.masterAge = null;
    this.masterSertificate = '';
    this.masterMark = null;
    this.image = '';

    //відправка даних на сервіс
    this.mastersService.addMasters(newMasters).subscribe(
      () => {
        this.getMasters();
      }
    )
  }

  public isDeleteMaster(master: IMasters): void {
    const id = master.id;
    if (confirm('You are sure?')) {
      if (this.adminMasters.length < 2) {
        alert('The last component cannot be deleted !!!')
      }
      else {
        this.mastersService.delMasters(id).subscribe(
          () => {
            this.getMasters();
          })
      }
    }

    // this.afStorage.ref(`images/${id}`).delete();
  }
  public isEditMaster(master: IMasters): void {
    this.editStatus = true;
    this.masterName = master.name;
    this.masterFullName = master.fullName;
    this.masterAge = master.age;
    this.masterSertificate = master.sertificate;
    this.masterMark = master.mark;
    this.image = master.image;
    this.editID = master.id;
  }
  public isSaveEditMaster(): void {
    const newMasters: IMasters = new NewMasters(
      this.editID,
      this.masterName,
      this.masterFullName,
      this.masterAge,
      this.masterSertificate,
      this.masterMark,
      this.image
    );
    this.masterName = '';
    this.masterFullName = '';
    this.masterAge = null;
    this.masterSertificate = '';
    this.masterMark = null;
    this.image = '';
    this.mastersService.editMasters(newMasters).subscribe(() => {
      this.getMasters();
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
    this.masterName = '';
    this.masterFullName = '';
    this.masterAge = null;
    this.masterSertificate = '';
    this.masterMark = null;
    this.image = '';
    this.editStatus = false;
  }


}
