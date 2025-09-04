import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModulesTeacherComponent } from './modules-teacher.component';

describe('ModulesTeacherComponent', () => {
  let component: ModulesTeacherComponent;
  let fixture: ComponentFixture<ModulesTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModulesTeacherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModulesTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
