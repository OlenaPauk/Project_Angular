import { Component, OnInit } from '@angular/core';
import { MessageService } from './../../shared/services/message.service';
import { IMessage } from './../../shared/interfaces/message.interface';
import { NewMessage } from './../../shared/classes/new-message.class';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  providers:[MessageService]
})
export class ContactComponent implements OnInit {
  messages: Array<IMessage> = [];
  userName: string;
  userEmail: string;
  userArea: string;
  constructor(private messageServise: MessageService,
    private toasts:ToastrService) {

  }

  ngOnInit() {
    // this.messages = this.messageServise.getData();
    this.getMessage();
  }
  private getMessage():void{
    this.messageServise.getMessage().subscribe(
      data=>{
        this.messages = data;
      },
      err =>{
        console.log(err);
      }
    )
  }
  public isAddMess():void{
    const newMessage: IMessage = new NewMessage(
      0,
      this.userName,
      this.userEmail,
      this.userArea
    );
    newMessage.id = this.messages.slice(-1)[0].id+1;
    this.userName = '';
    this.userEmail = '';
    this.userArea = '';
    this.messageServise.addMess(newMessage).subscribe(
      ()=>{
        this.getMessage();
      }
    )
    this.toasts.success('Thank you for your message)','Іuccessfully sent')
  }

}
