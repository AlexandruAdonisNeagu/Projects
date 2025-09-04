import { ChatService } from './../../services/chat.service';
import { Profile } from './../../models/profile';
import { ProfileService } from './../../services/profile.service';
import { Router } from '@angular/router';
import { TeacherService } from './../../services/teacher.service';
import { Component, OnInit } from '@angular/core';
import { Teacher } from 'src/app/models/teacher';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit {
  teacherList: Teacher[] = [];
  teachers: Teacher[] = [];
  profile: Profile
  constructor(private teacherService: TeacherService,
              private socket: Socket,
              private profileService: ProfileService,
              private chatService: ChatService,
              private route: Router) { }

  ngOnInit(): void {
    this.teacherService.getTeachers().subscribe(res => {
      this.teacherList = res;
      this.teachers = res;
    });

    this.profileService.getProfile().subscribe(res => {
      this.profile = res[0];
    })
  }

  goToPrivateChat(teacher_id, teacherName: string): void{
    this.chatService.privateChatName = teacherName;
    const room = "pc_" + teacher_id + "_" + this.profile.id;
    console.log(room);
    this.route.navigate(['/private-chat/' + room])
  }

  nameFilter(name: string="none"){
    this.teachers = [];
    this.teacherList.forEach(teacher => {
        if(teacher.name.toLowerCase().includes(name.toLowerCase()))
          this.teachers.push(teacher);
        if(name=='none')
          this.teachers.push(teacher);
    });
  }

}
