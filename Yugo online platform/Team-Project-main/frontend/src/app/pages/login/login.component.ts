import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Login } from 'src/app/models/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  login: Login = {} as Login;
  constructor(private authService: AuthService,
              private route: Router) {
  }

  ngOnInit(): void {
  }

  loginUser(): void{
    console.log(this.login);
    this.authService.login(this.login, true).subscribe(res => {
      const decoded = this.authService.getDecodedAccessToken(res);
      if(decoded.is_teacher)
        this.route.navigate(['/modules-teacher']);
      else
        this.route.navigate(['/modules']);
   });
  }

  loginUserFacialRecognition(): void{
    console.log("test");
    this.authService.loginFacial().subscribe(res => {
      this.route.navigate(['/modules']);
    })
  }

}
