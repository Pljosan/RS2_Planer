import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import * as moment from 'moment';
import * as momentB from 'moment-business-days';
import {MatDialog} from "@angular/material";
import {AddTaskDialogComponent} from "../add-task-dialog/add-task-dialog.component";
import {Task} from "./task.model";
import {_localeFactory} from "@angular/core/src/application_module";
import {logWarnings} from "protractor/built/driverProviders";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  tasks;
  date;
  currYear;
  currMonth;
  noOfDays;
  freeDays;
  freeDaysAfter;
  daysData = [];
  calendarTittle;


  task = {
    name: 'Test',
    date: '12/11/2018',
    time: '10:10:10',
    userId: 4,
    desc: 'tra la la al'
  };

  // taskData = [
  //   {
  //     name: 'Test',
  //     date: '12/11/2018',
  //     time: '10:10:10',
  //     userId: 4,
  //     desc: 'tra la la al'
  //   },
  //   {
  //     name: 'Test2',
  //     date: '12/12/2018',
  //     time: '10:12:10',
  //     userId: 4,
  //     desc: 'tra ld222 222 222a la al'
  //   },
  taskData;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string,
              private cd: ChangeDetectorRef,
              private dialog: MatDialog) {
    http.get<Task[]>(baseUrl + 'api/Task/GetTasks').subscribe(result => {
      this.tasks = result;
      // this.cd.detectChanges();
      this.fillDaysData();
    }, error => console.error(error));
  }

  ngOnInit() {
    this.date = moment();
    this.generateDate(0);
    this.fillDaysData();

  }

  openDialog() {
    const dialogRef = this.dialog.open(AddTaskDialogComponent);
  }

  fillDaysData() {
    this.daysData.length = 0;
    for (let i = 0; i <= moment(this.date).daysInMonth(); i++) {
      this.daysData[i] = this.getDayTasks(i);
    }
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

