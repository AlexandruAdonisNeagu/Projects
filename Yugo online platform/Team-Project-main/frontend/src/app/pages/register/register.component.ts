import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Register } from './../../models/register';
import { Component, OnInit } from '@angular/core';
import { Courses } from 'src/app/models/courses';
import {WebcamImage} from 'ngx-webcam';
import {Subject, Observable} from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  register: Register = {} as Register;
  courses: Courses;
  photoMode = false;
  maxPhoto = 0;
  constructor(private authService: AuthService,
              private route: Router) { }

  ngOnInit(): void {
    this.authService.getCourses().subscribe((res: Courses) => {
      this.courses = res;
      this.register.course_id = this.courses[0].id
    })
  }

  registerUser(): void{
    console.log(this.register)
    this.authService.register(this.register).subscribe(res => {
      this.route.navigate(['/login']);
   });
  }

  photoShooting(): void{
    this.photoMode = true;
  }

  exitPhotoShooting(): void{
    this.photoMode = false;
    this.maxPhoto = 0;
  }

  public webcamImages: WebcamImage[] = [];
  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  triggerSnapshot(): void {
   this.trigger.next();
  }

  handleImage(webcamImage: WebcamImage): void {
   console.info('received webcam image', webcamImage);
   this.webcamImages.push(webcamImage);
   this.maxPhoto +=1;
  }

  removeImages(): void{
    this.webcamImages = [];
    this.maxPhoto = 0;
  }

  public get triggerObservable(): Observable<void> {
   return this.trigger.asObservable();
  }
}
