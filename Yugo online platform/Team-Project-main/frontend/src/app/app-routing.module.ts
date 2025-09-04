import { GradebookComponent } from './pages/gradebook/gradebook.component';
import { ScheduleComponent } from './pages/schedule/schedule.component';
import { ChatTeacherComponent } from './pages/chat-teacher/chat-teacher.component';
import { ProfileTeacherComponent } from './pages/profile-teacher/profile-teacher.component';
import { ModulesTeacherComponent } from './pages/modules-teacher/modules-teacher.component';
import { PrivateChatComponent } from './pages/private-chat/private-chat.component';
import { ChatListComponent } from './pages/chat-list/chat-list.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ModuleComponent } from './pages/module/module.component';
import { ModulesComponent } from './pages/modules/modules.component';
import { RegisterComponent } from './pages/register/register.component';
import {HomeComponent} from './pages/home/home.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'module/:id', component: ModuleComponent, canActivate:[AuthGuard]},
  { path: 'modules', component: ModulesComponent, canActivate:[AuthGuard]},
  { path: 'profile', component: ProfileComponent, canActivate:[AuthGuard]},
  { path: 'chat-list', component: ChatListComponent, canActivate:[AuthGuard]},
  { path: 'modules-teacher', component: ModulesTeacherComponent, canActivate:[AuthGuard]},
  { path: 'profile-teacher', component: ProfileTeacherComponent, canActivate:[AuthGuard]},
  { path: 'chat-list-teacher', component: ChatTeacherComponent, canActivate:[AuthGuard]},
  { path: 'private-chat/:id', component: PrivateChatComponent, canActivate:[AuthGuard]},
  { path: 'schedule', component: ScheduleComponent, canActivate:[AuthGuard]},
  { path: 'gradebook', component: GradebookComponent, canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
