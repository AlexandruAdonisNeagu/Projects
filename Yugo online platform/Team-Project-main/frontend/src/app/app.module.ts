import { environment } from 'src/environments/environment';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ModulesComponent } from './pages/modules/modules.component';
import { ModuleComponent } from './pages/module/module.component';
import { HeaderComponent } from './pages/header/header.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ChatListComponent } from './pages/chat-list/chat-list.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component';
import { AuthInterceptor } from './common/auth.interceptor';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { PrivateChatComponent } from './pages/private-chat/private-chat.component';
import { ModulesTeacherComponent } from './pages/modules-teacher/modules-teacher.component';
import { ProfileTeacherComponent } from './pages/profile-teacher/profile-teacher.component';
import { ChatTeacherComponent } from './pages/chat-teacher/chat-teacher.component';
import { HomeHeaderComponent } from './pages/home-header/home-header.component';
import {WebcamModule} from 'ngx-webcam';
import { ScheduleComponent } from './pages/schedule/schedule.component';
import { GradebookComponent } from './pages/gradebook/gradebook.component';

const config: SocketIoConfig = { url: environment.url, options: {} };

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ModulesComponent,
    ModuleComponent,
    HeaderComponent,
    ProfileComponent,
    ChatListComponent,
    HomeComponent,
    PrivateChatComponent,
    ModulesTeacherComponent,
    ProfileTeacherComponent,
    ChatTeacherComponent,
    HomeHeaderComponent,
    ScheduleComponent,
    GradebookComponent,
  ],
  imports: [
    BrowserModule,
    WebcamModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    SocketIoModule.forRoot(config),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
