import { IServices } from '../interfaces/services.interface';

export class NewServices implements IServices{
    constructor(
        public id: number,
        public name: string,
        public description: string,
        public price1: number,
        public price2: number,
        public price3: number,
        public mark: number,
        public image?:string
    ){}
}