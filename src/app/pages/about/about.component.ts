import { Component, OnInit, HostListener } from '@angular/core';
import { MastersService } from 'src/app/shared/services/masters.service';
import { IMasters } from 'src/app/shared/interfaces/masters.interface';
import { OrderPipe } from 'ngx-order-pipe';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  order: string = 'mark';
  reverse: boolean = false;
  sortedMasters: any[];
  searchTerm: string;
  masters: Array<IMasters> = [];
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
  constructor(private mastersServices: MastersService,private orderPipe: OrderPipe) {
    this.getMasters();
    this.sortedMasters = orderPipe.transform(this.masters, 'mark');
    console.log(this.sortedMasters);
  }

  ngOnInit() {
    // this.masters = this.mastersServices.getData();
  }
  private getMasters(): void {
    this.mastersServices.getMasters().subscribe(
      data => {
        this.masters = data;
      },
      err => {
        console.log(err)
      }
    )
  }
  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
      console.log(this.sortedMasters.map(x=>x.mark));
    }

    this.order = value;
  }
  public searchMasters():void{
this.searchTerm= '';
  }

}
