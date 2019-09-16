import { Component } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import * as AOS from 'aos';
import { AuthService } from './pages/not-auth/core/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  
})
export class AppComponent {
  title = 'project';
  ngOnInit(){
    AOS.init();
  }
  constructor(private ngxService: NgxUiLoaderService,public authService: AuthService){
    this.ngxService.start();
    setTimeout(()=>{
      this.ngxService.stop();
    },5000);
    this.ngxService.startBackground('do-background-things');
    this.ngxService.stopBackground('do-background-things');
    this.ngxService.startLoader('loader-01');
    setTimeout(()=>{
      this.ngxService.stopLoader('loader-01');
    },5000)
    
  }
}

