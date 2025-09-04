import { AuthService } from './../../services/auth.service';
import { ChatService } from './../../services/chat.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/models/message';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-private-chat',
  templateUrl: './private-chat.component.html',
  styleUrls: ['./private-chat.component.scss']
})
export class PrivateChatComponent implements OnInit {
  roomId: string;
  message: string = "";
  messages: Message[] = [];
  email: string;
  privateName: string;
  constructor(private route: ActivatedRoute,
              private authService: AuthService,
              private chatService: ChatService) { }

  ngOnInit(): void {
    this.roomId = this.route.snapshot.params.id;

    this.privateName = this.chatService.privateChatName;
    this.chatService.getMessage({room_id: this.roomId}).subscribe(res => {
      this.messages = res;
      console.log(this.messages);
    });

    this.chatService.chatListener.subscribe(res => {
      this.messages.push(res);
      console.log(this.messages);
    });

    this.email = this.authService.getDecodedAccessToken().sub;
    this.chatService.joinChat({email: this.email, room: this.roomId});
  }

  sendMessage(): void{
    this.chatService.sendMessage({room: this.roomId, content: this.message, email: this.email});
    this.message = "";
  }

}
