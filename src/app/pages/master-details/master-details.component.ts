import { Component, OnInit } from '@angular/core';
import { IMasters } from './../../shared/interfaces/masters.interface';
import { MasterDetailsService } from './../../shared/services/master-details.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-master-details',
  templateUrl: './master-details.component.html',
  styleUrls: ['./master-details.component.css']
})
export class MasterDetailsComponent implements OnInit {
  view: IMasters;
  masterId: number;

  constructor(private masterDetailsService: MasterDetailsService, private route: ActivatedRoute) {
    this.getMaster();
  }

  ngOnInit() {
  }
  public getMaster(): void {
    this.masterId = Number(this.route.snapshot.paramMap.get('id'));
    this.masterDetailsService.getServiceDetails(this.masterId).subscribe(
      data => {
        this.view = data;
      }
    )

  }

}
