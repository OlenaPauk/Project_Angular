import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/pages/not-auth/core/auth.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [ NgbModalConfig, NgbModal]
})
export class HeaderComponent implements OnInit {
  adminEmail:string;
  adminPass:string;
  constructor(public authService: AuthService, private modalService: NgbModal) { }

  ngOnInit() {
  }
public enterAdmin():void{
  this.adminEmail = '';
  this.adminPass = '';
}
open(content) {
  this.modalService.open(content);
}

}
