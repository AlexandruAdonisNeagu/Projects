import { ProfileService } from './../../services/profile.service';
import { Profile } from './../../models/profile';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  profile: Profile;
  constructor(private authService: AuthService,
              private profileService: ProfileService) { }

  ngOnInit(): void {
    this.profileService.getProfile().subscribe(res => {
      this.profile = res[0];
      console.log(this.profile)
    })
  }

  logOut(){
    this.authService.logoutUser();
  }

}
