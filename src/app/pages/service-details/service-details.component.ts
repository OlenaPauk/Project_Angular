import { Component, OnInit } from '@angular/core';
import { IServices } from 'src/app/shared/interfaces/services.interface';
import { ServiceDetailsService } from 'src/app/shared/services/service-details.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.css']
})
export class ServiceDetailsComponent implements OnInit {
  view: IServices;
  serviceId: number;

  constructor(private serviceDetailsService: ServiceDetailsService, private route: ActivatedRoute) {
    this.getService();
  }

  ngOnInit() {
  }
  public getService(): void {
    this.serviceId = Number(this.route.snapshot.paramMap.get('id'));
    this.serviceDetailsService.getServiceDetails(this.serviceId).subscribe(
      data => {
        this.view = data;
      }
    )

  }

}
