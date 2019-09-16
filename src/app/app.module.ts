import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrderModule } from 'ngx-order-pipe';
import { NgbModule, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

import {NgxUiLoaderModule, NgxUiLoaderRouterModule} from 'ngx-ui-loader';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { SpaComponent } from './pages/spa/spa.component';
import { ClubCardsComponent } from './pages/club-cards/club-cards.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AdminComponent } from './admin/admin.component';
import { AdminMastersComponent } from './admin/admin-masters/admin-masters.component';
import { AdminServicesComponent } from './admin/admin-services/admin-services.component';
import { AdminClientMessageComponent } from './admin/admin-client-message/admin-client-message.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { ServiceDetailsComponent } from './pages/service-details/service-details.component';
import { MasterDetailsComponent } from './pages/master-details/master-details.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { AdminGalleryComponent } from './admin/admin-gallery/admin-gallery.component';
import { MasterFilterPipe } from './pipes/master-filter.pipe';
import { NotAuthComponent } from './pages/not-auth/not-auth.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    SpaComponent,
    ClubCardsComponent,
    AboutComponent,
    ContactComponent,
    AdminComponent,
    AdminMastersComponent,
    AdminServicesComponent,
    AdminClientMessageComponent,
    ServiceDetailsComponent,
    MasterDetailsComponent,
    GalleryComponent,
    AdminGalleryComponent,
    MasterFilterPipe,
    NotAuthComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase, 'my-app-name'), // imports firebase/app needed for everything
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    OrderModule,
    ToastrModule.forRoot(),
    NgbModule,
     NgbCarouselModule,
     NgxUiLoaderModule,
     NgxUiLoaderRouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
