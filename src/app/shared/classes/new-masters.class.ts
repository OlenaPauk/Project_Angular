import { IMasters } from "../interfaces/masters.interface";

export class NewMasters implements IMasters{
    constructor(
        public id: number,
        public name: string,
        public fullName: string,
        public age: number,
        public sertificate: string,
        public mark:number,
        public image?:string,
     
    ){}
}