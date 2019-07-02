import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import * as moment from 'moment';
import * as momentB from 'moment-business-days';
import {MatDialog} from "@angular/material";
import {AddTaskDialogComponent} from "../add-task-dialog/add-task-dialog.component";
import {Task} from "./task.model";
import {DayTasksDialogComponent} from "../day-tasks-dialog/day-tasks-dialog.component";
import { EncrDecrService } from '../encr-decr/encr-decr-service.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  tasks;
  taskFiles: TaskFile[];
  date;
  currYear;
  currMonth;
  noOfDays;
  freeDays;
  freeDaysAfter;
  daysData = [];
  daysFiles = [];
  calendarTittle;
  loggedUserId;


  taskData = [
    {
      name: 'Test',
      date: '12/11/2018',
      time: '10:10:10',
      user: new User(4),
      desc: 'tra la la al'
    },
    {
      name: 'Test2',
      date: '12/12/2018',
      time: '10:12:10',
      user: new User(4),
      desc: 'tra ld222 222 222a la al'
    },
  ];


  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string,
              private cd: ChangeDetectorRef,
              private dialog: MatDialog,
              private EncrDecr: EncrDecrService) {

    this.loggedUserId = parseInt(this.EncrDecr.get('123456$#@$^@1ERF', sessionStorage.getItem('id')));
    http.get<Task[]>(baseUrl + 'api/Task/GetTasks/' + this.loggedUserId).subscribe(result => {
      this.tasks = result;
      console.log(this.tasks);
      // this.fillDaysData();
    }, error => console.error(error));

    http.get<TaskFile[]>(baseUrl + 'api/TaskFile/getTaskFilesForUser/' + this.loggedUserId).subscribe(result => {
      this.taskFiles = result;
      console.log(this.taskFiles);
      this.fillDaysData();
    }, error => console.error(error));
  }

  ngOnInit() {
    this.date = moment();
    this.generateDate(0);
    this.fillDaysData();

  }

  openDialog(dayNo) {
    console.log(dayNo);
    console.log(this.daysData[dayNo].length);
    const date = moment({y: moment(this.date).year(), M: moment(this.date).month(), d: dayNo});
    console.log(date.format('DD/MM/YYYY'));
    let addTaskDialogRef;
    if (this.daysData[dayNo].length === 0) {
      console.log('dodaj novi');
      addTaskDialogRef = this.dialog.open(AddTaskDialogComponent, {
        data: {date}
      });

      addTaskDialogRef.afterClosed().subscribe(res => {
        if (res === 'submitted') {
          this.http.get<Task[]>(this.baseUrl + 'api/Task/GetTasks/' + this.loggedUserId).subscribe(result => {
            this.tasks = result;
            this.fillDaysData();
          }, error => console.error(error));
        }
      })
    } else {
      console.log('edit');
      const tasks = this.daysData[dayNo];
      const files = this.daysFiles[dayNo];
      const dialogRef = this.dialog.open(DayTasksDialogComponent, {
        data: {tasks, files}
      });

      dialogRef.afterClosed().subscribe(res => {
        if (res == 'addNew') {
          addTaskDialogRef  = this.dialog.open(AddTaskDialogComponent, {
            data: {date}
          });

          addTaskDialogRef.afterClosed().subscribe(res => {
            if (res === 'submitted') {
              this.http.get<Task[]>(this.baseUrl + 'api/Task/GetTasks/' + this.loggedUserId).subscribe(result => {
                this.tasks = result;
                this.fillDaysData();
              }, error => console.error(error));
            }
          })
        }
      })

    }
  }

  fillDaysData() {
    this.daysData.length = 0;
    for (let i = 0; i <= moment(this.date).daysInMonth(); i++) {
      this.daysData[i] = this.getDayTasks(i);
      this.daysFiles[i] = this.getDayFiles(i);
    }
    console.log("DAYS FILES");
    console.log(this.daysFiles);
    this.cd.detectChanges();
  }

  getDayTasks(dayNo) {
    const dayTasks = [];
    const myDate = moment({y: this.currYear, M: this.currMonth - 1, d: dayNo});
    if (this.tasks) {
      for (let i = 0; i < this.tasks.length; i++) {
        if (myDate.isSame(moment(this.tasks[i].date))) {
          dayTasks.push(this.tasks[i]);
        }
      }
    }

    return dayTasks;
  }

  getDayFiles(dayNo) {
    const dayFiles = [];
    const myDate = moment({y: this.currYear, M: this.currMonth - 1, d: dayNo});
    if (this.taskFiles) {
      for (let i = 0; i < this.taskFiles.length; i++) {
        if (myDate.isSame(moment(this.taskFiles[i].task.date))) {
          dayFiles.push(this.taskFiles[i].filePath);
        }
      }
    }

    return dayFiles;
  }

  isToday(index): boolean {
    return moment({y: this.currYear, M: this.currMonth - 1, d: index}).isSame(moment().format('YYYY-MM-DD'));
  }

  isWeekend(dayNo): boolean {
    return !(momentB(moment({y: this.currYear, M: this.currMonth - 1, d: dayNo})).isBusinessDay());
  }

  nextMon(): void {
    this.generateDate(1);
    this.fillDaysData();
  }

  previousMon(): void {
    this.generateDate(-1);
    this.fillDaysData();
  }

  generateDate(amount) {
    this.date = moment(this.date).add(amount, 'month').format('YYYY-MM-DD');
    this.calendarTittle = moment(this.date).format('MMMM YYYY').toUpperCase();
    this.currMonth = +moment(this.date).format('MM');
    this.currYear = +moment(this.date).format('YYYY');
    this.noOfDays = new Array(moment(this.date).daysInMonth());
    this.freeDays = new Array((moment({y: this.currYear, M: this.currMonth - 1, d: 1}).day() + 6) % 7);
    this.freeDaysAfter = new Array((7 - moment(this.date).endOf('month').day()) % 7);
  }


}


class User {
  constructor (userID: number) {
    this.userID = userID;
  }

  userID: number;
}

class TaskFile {
  constructor(task, filePath) {
      this.task = task;
      this.filePath = filePath;
  }

  task: Task;
  filePath: string;
}