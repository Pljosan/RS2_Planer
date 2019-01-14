import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayTasksDialogComponent } from './day-tasks-dialog.component';

describe('DayTasksDialogComponent', () => {
  let component: DayTasksDialogComponent;
  let fixture: ComponentFixture<DayTasksDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayTasksDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayTasksDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
