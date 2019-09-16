import { Component, OnInit, HostListener } from '@angular/core';
import { ServicesService } from 'src/app/shared/services/services.service';
import { IServices } from 'src/app/shared/interfaces/services.interface';
import { OrderPipe } from 'ngx-order-pipe';

@Component({
  selector: 'app-spa',
  templateUrl: './spa.component.html',
  styleUrls: ['./spa.component.css'],
  providers: [ServicesService]
})
export class SpaComponent implements OnInit {

  order: string = 'price1';
  reverse: boolean = false;
  sortedServices: any[];

  services: Array<IServices> = [];
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
  constructor(private servicesService: ServicesService, private orderPipe: OrderPipe) {
    this.getServices();
    this.sortedServices = orderPipe.transform(this.services, 'price1');
    console.log(this.sortedServices);
  }

  ngOnInit() {

  }
  private getServices(): void {
    this.servicesService.getServices().subscribe(
      data => {
        this.services = data;
      },
      err => {
        console.log(err)
      }
    )
  }
  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
      console.log(this.sortedServices.map(x=>x.price1));
    }

    this.order = value;
  }
}
