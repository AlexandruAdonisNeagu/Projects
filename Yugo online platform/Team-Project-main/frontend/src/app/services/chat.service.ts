import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  chatListener = this.socket.fromEvent<any>('chat_listener');

  constructor(private http: HttpClient,
              private socket: Socket) { }

  privateChatName: string;
  getMessage(data): Observable<any>{
    return this.http.post(environment.url + "display_message", data);
  }

  sendMessage(data): void{
    this.socket.emit("send_message", data);
  }

  joinChat(data): void{
    this.socket.emit("join_chat", data);
  }
}
