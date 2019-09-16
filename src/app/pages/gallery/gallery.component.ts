import { Component, OnInit, HostListener } from '@angular/core';
import { GalleryService } from './../../shared/services/gallery.service';
import { IGallery } from './../../shared/interfaces/gallery.interface';

// import {
//   trigger,
//   state,
//   style,
//   animate,
//   transition,
//   query,
//   stagger
// } from '@angular/animations';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
  providers: [GalleryComponent],

  // animations: [
  //   trigger('photosAnimation', [
  //     transition('* => *', [
  //       query('img',
  //         style({ transform: 'translateY(100%)', })),
  //       query('img',
  //         stagger('300ms', [
  //           animate('900ms', style({ transform: 'translateY(0)' }))
  //         ]))
  //     ])
  //   ])
  // ]

})


export class GalleryComponent implements OnInit {
  image: string;
  show = false;
  gallery: Array<IGallery> = [];
  isShow: boolean;
  topPosToStartShowing = 100;
  view: string;
  images: any[] = [];

  arrImage: any[] = [];
  number: number;

  @HostListener('window:scroll')
  public checkScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    if (scrollPosition >= this.topPosToStartShowing) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  }
  get stateName() {
    return this.show ? 'show' : 'hide'
  }



  public gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
  constructor(private galleryService: GalleryService) {
    this.getGallery();
  }

  ngOnInit() {
    // this.gallery = this.galleryService.getData();
  }
  private getGallery(): void {
    this.galleryService.getGallery().subscribe(
      data => {
        //   this.gallery = data;
        //   for (let key in this.gallery) {
        //     this.images.push(this.gallery[key].image)
        //   }
        //   console.log(this.images.length);
        //   console.log(this.images);
        // },
        this.gallery = data;
        this.images = this.gallery.filter(x => x.image);
        err => {
          console.log(err)
        }}
    )
  }
  public imageItem(id): void {
    this.view = this.images[id].image;
    this.number = id;
    this.arrImage = [];
    this.arrImage = this.images.filter(x => x.images != this.view).map(y => y.image);
    this.arrImage.unshift(this.view);
    // this.view = this.images[id];
    // console.log(this.view);
    // this.number = id;
    // this.arrImage = [];
    // this.arrImage[0] = this.view;
    // for (let i = 0; i < this.images.length; i++) {
    //   if (this.images[i] != this.view) {
    //     this.arrImage.push(this.images[i])
    //   }
    // }





  }




}
