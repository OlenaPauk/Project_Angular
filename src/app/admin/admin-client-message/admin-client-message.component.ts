import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/shared/services/message.service';
import { IMessage } from 'src/app/shared/interfaces/message.interface';

@Component({
  selector: 'app-admin-client-message',
  templateUrl: './admin-client-message.component.html',
  styleUrls: ['./admin-client-message.component.css'],
  providers: [MessageService]
})
export class AdminClientMessageComponent implements OnInit {
  adminMessages: Array<IMessage> = [];
  userName: string;
  userEmail: string;
  userArea: string;

  constructor(private messageServise: MessageService) { }

  ngOnInit() {
    // this.adminMessages = this.messageServise.getData();
    this.getMessage();
  }
  private getMessage(): void {
    this.messageServise.getMessage().subscribe(
      data => {
        this.adminMessages = data;
      },
      err => {
        console.log(err);
      }
    )
  }

  public isDeleteMess(message: IMessage): void {
    const id = message.id;
    if (confirm('You are sure?')) {
      if (this.adminMessages.length < 2) {
        alert('The last component cannot be deleted !!!')
      }
      else {
        this.messageServise.delMess(id).subscribe(
          () => {
            this.getMessage();
          }
        )
      }
    }


  }

  changeStatus(message: any): void {
    message.status = !message.status;
  }
}
