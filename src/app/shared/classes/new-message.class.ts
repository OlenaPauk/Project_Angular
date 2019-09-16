import { IMessage } from "../interfaces/message.interface";

export class NewMessage implements IMessage{
    constructor(
        public id: number,
        public name: string,
        public email:string,
        public message: string,
    ){}
}