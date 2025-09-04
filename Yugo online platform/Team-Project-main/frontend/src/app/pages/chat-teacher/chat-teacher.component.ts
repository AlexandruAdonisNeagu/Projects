import { ChatService } from './../../services/chat.service';
import { StudentService } from './../../services/student.service';
import { Student } from './../../models/student';
import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/models/profile';
import { ProfileService } from 'src/app/services/profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat-teacher',
  templateUrl: './chat-teacher.component.html',
  styleUrls: ['./chat-teacher.component.scss']
})
export class ChatTeacherComponent implements OnInit {
  studentList: Student[] = [];
  students: Student[] = [];
  colorPallette = ["#173F5F", "#3CAEA3", "#20639B"];

  profile: Profile;
  constructor(private studentService: StudentService,
              private profileService: ProfileService,
              private chatService: ChatService,
              private route: Router) { }

  ngOnInit(): void {
    this.studentService.getStudents().subscribe(res => {
      console.log(res);
      this.studentList = res;
      this.students = res;
    });

    this.profileService.getProfile().subscribe(res => {
      this.profile = res[0];
    });
  }

  filter(name: string="none"){
    this.students = [];
    this.studentList.forEach(student => {
        if(student.module==name)
          this.students.push(student);
        if(name=='none')
          this.students.push(student);
    });
  }

  nameFilter(name: string="none"){
    this.students = [];
    this.studentList.forEach(student => {
        if(student.full_name.toLowerCase().includes(name.toLowerCase()))
          this.students.push(student);
        if(name=='none')
          this.students.push(student);
    });
    name = "";
  }

  goToPrivateChat(student_id, name): void{
    this.chatService.privateChatName = name;
    const room = "pc_" + this.profile.id + "_" + student_id;
    this.route.navigate(['/private-chat/' + room])
  };

}
