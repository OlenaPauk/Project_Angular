import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SpaComponent } from './pages/spa/spa.component';
import { ServiceDetailsComponent } from './pages/service-details/service-details.component';
import { ClubCardsComponent } from './pages/club-cards/club-cards.component';
import { AboutComponent } from './pages/about/about.component';
import { MasterDetailsComponent } from './pages/master-details/master-details.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AdminComponent } from './admin/admin.component';
import { AdminMastersComponent } from './admin/admin-masters/admin-masters.component';
import { AdminGalleryComponent } from './admin/admin-gallery/admin-gallery.component';
import { AdminServicesComponent } from './admin/admin-services/admin-services.component';
import { AdminClientMessageComponent } from './admin/admin-client-message/admin-client-message.component';
// import { NotAuthComponent } from './pages/not-auth/not-auth.component';
import { AdminGuard }   from './admin.guard';
// import{AuthGuard} from './pages/not-auth/core/auth.guard';
const routes: Routes = [
  {path:'' , redirectTo: '/home', pathMatch:'full'},
  {path:'home' , component:HomeComponent},
  {path:'spa' , component:SpaComponent},
  {path:'spa/:id' , component:ServiceDetailsComponent },
  {path:'club-cards' , component:ClubCardsComponent},
  {path:'about' , component: AboutComponent},
  {path:'about/:id' , component: MasterDetailsComponent},
  {path:'gallery' , component: GalleryComponent},
  {path:'contact' , component:ContactComponent},
  {path:'admin' , component:AdminComponent , canActivate: [AdminGuard],
   children:[
    {path:'' , redirectTo: 'masters', pathMatch:'full'},
    {path:'masters' , component:AdminMastersComponent},
    {path:'services' , component:AdminServicesComponent},
    {path:'gallery' , component:AdminGalleryComponent},
    {path:'clientMessage' , component:AdminClientMessageComponent},
    {path:'**' , redirectTo: 'masters'},
  ]},
  // {path:'notauth' , component: NotAuthComponent},
  {path:'**' , redirectTo:'/home'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule],
  providers:    [AdminGuard],
})
export class AppRoutingModule { } 
