import { AuthService } from './../../services/auth.service';
import { ChatService } from './../../services/chat.service';
import { ModuleService } from './../../services/module.service';
import { AfterViewInit, Component, OnInit, } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Module } from 'src/app/models/module';
import { Message } from 'src/app/models/message';
declare var JitsiMeetExternalAPI: any;

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.scss']
})
export class ModuleComponent implements OnInit, AfterViewInit {
  message: string = "";
  messages: Message[] = [];
  domain: string = "meet.jit.si"; // For self hosted use your domain
  videoCall: boolean = false;
  room: any;
  room_id: string;
  options: any;
  api: any;
  user: any;

  // For Custom Controls
  isAudioMuted = false;
  isVideoMuted = false;

  module:Module;
  email:string;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private moduleService: ModuleService,
    private authService: AuthService,
    private chatService: ChatService,
  ) { }

  showVideoCall(){
    this.videoCall = true;
    console.log(this.videoCall);
  }

  ngOnInit(): void {
    this.room_id = this.route.snapshot.params.id;
    this.room = 'iugo_' + this.room_id;

    this.moduleService.getModule({module_id: this.room_id}).subscribe(res =>
      this.module = res
    );

    this.chatService.getMessage({room_id: this.room_id}).subscribe(res => {
      this.messages = res;
      console.log(this.messages);
    });

    this.chatService.chatListener.subscribe(res => {
      this.messages.push(res);
      console.log(this.messages);
    });

    this.email = this.authService.getDecodedAccessToken().sub;

    this.chatService.joinChat({email: this.email, room: this.room_id});
  }

  sendMessage(): void{
    this.chatService.sendMessage({room: this.room_id, content: this.message, email: this.email});
    this.message = "";
  }

  ngAfterViewInit(): void {
    this.options = {
      roomName: this.room,
      height: 500,
      configOverwrite: { prejoinPageEnabled: true },
      interfaceConfigOverwrite: {
        // overwrite interface properties
      },
      parentNode: document.querySelector('#jitsi-iframe'),
    }

    this.api = new JitsiMeetExternalAPI(this.domain, this.options);

    // Event handlers
    this.api.addEventListeners({
      readyToClose: this.handleClose,
      participantLeft: this.handleParticipantLeft,
      participantJoined: this.handleParticipantJoined,
      videoConferenceJoined: this.handleVideoConferenceJoined,
      videoConferenceLeft: this.handleVideoConferenceLeft,
      audioMuteStatusChanged: this.handleMuteStatus,
      videoMuteStatusChanged: this.handleVideoStatus,
      passwordRequired: this.passwordRequired,
      //participantRoleChanged: this.participantRoleChanged,
    });
  }

  // participantRoleChanged = (event) => {
  //   if (event.role === "moderator") {
  //     this.api.executeCommand('password', 'The Password');
  //   }
  // }

  passwordRequired = () => {
    this.api.executeCommand('password', 'The Password');
  }

  handleClose = () => {
    // console.log("handleClose");
  }

  handleParticipantLeft = async (participant) => {
    // console.log("handleParticipantLeft", participant);
    const data = await this.getParticipants();
  }

  handleParticipantJoined = async (participant) => {
    // console.log("handleParticipantJoined", participant);
    const data = await this.getParticipants();
  }

  handleVideoConferenceJoined = async (participant) => {
    // console.log("handleVideoConferenceJoined", participant);
    const data = await this.getParticipants();
  }

  handleVideoConferenceLeft = () => {
    // console.log("handleVideoConferenceLeft");
    this.router.navigate(['/thank-you']);
  }

  handleMuteStatus = (audio) => {
    // console.log("handleMuteStatus", audio);
  }

  handleVideoStatus = (video) => {
    // console.log("handleVideoStatus", video);
  }

  getParticipants() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.api.getParticipantsInfo());
      }, 500)
    });
  }

  executeCommand(command: string) {
    this.api.executeCommand(command);;
    if (command == 'hangup') {
      this.router.navigate(['/thank-you']);
      return;
    }

    if (command == 'toggleAudio') {
      this.isAudioMuted = !this.isAudioMuted;
    }

    if (command == 'toggleVideo') {
      this.isVideoMuted = !this.isVideoMuted;
    }
  }

}
