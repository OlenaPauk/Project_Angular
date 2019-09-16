import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  isShow: boolean;
  topPosToStartShowing = 100;
  @HostListener('window:scroll')
  public checkScroll() {


    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;


    if (scrollPosition >= this.topPosToStartShowing) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  }

  public gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  constructor() { }

  ngOnInit() {
  }

}
