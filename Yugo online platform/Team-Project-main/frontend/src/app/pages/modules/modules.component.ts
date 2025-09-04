import { Router } from '@angular/router';
import { Module } from './../../models/module';
import { ModuleService } from './../../services/module.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.scss']
})
export class ModulesComponent implements OnInit {
  @ViewChild('scrollMe') comment: ElementRef;
  modules: Module[] = []
  colorPallette = ["#173F5F", "#20639B", "#3CAEA3"];
  constructor(private moduleService : ModuleService,
              private router: Router) { }

  ngOnInit(): void {
    this.moduleService.getModules().subscribe(res => {
      console.log(res);
      this.modules = res;
    })
  }

  goToModule(module_id): void {
    this.router.navigate(["/module/" + module_id]);
  }

}
