import { IGallery } from '../interfaces/gallery.interface';

export class NewGallery implements IGallery{
    constructor(
        public id: number,
        public image?:string
    ){}
}