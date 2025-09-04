import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Module } from 'src/app/models/module';
import { ModuleService } from 'src/app/services/module.service';

@Component({
  selector: 'app-modules-teacher',
  templateUrl: './modules-teacher.component.html',
  styleUrls: ['./modules-teacher.component.scss']
})
export class ModulesTeacherComponent implements OnInit {
  @ViewChild('scrollMe') comment: ElementRef;
  modules: Module[] = []
  colorPallette = ["#173F5F", "#20639B", "#3CAEA3"];
  constructor(private moduleService : ModuleService,
              private router: Router) { }

  ngOnInit(): void {
    this.moduleService.getModulesTeacher().subscribe(res => {
      console.log(res);
      this.modules = res;
    })
  }

  goToModule(module_id): void {
    this.router.navigate(["/module/" + module_id]);
  }

}
