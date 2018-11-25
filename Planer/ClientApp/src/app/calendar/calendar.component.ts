import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import * as moment from 'moment';
import * as momentB from 'moment-business-days';
import {MatDialog} from "@angular/material";
import {AddTaskDialogComponent} from "../add-task-dialog/add-task-dialog.component";
// import {Task} from "./task.model";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  public tasks: Task[];
  date;
  currYear;
  currMonth;
  noOfDays;
  freeDays;
  freeDaysAfter;
  daysData;
  calendarTittle;


  task = {
    name: 'Test',
    date: '12/11/2018',
    time: '10:10:10',
    userId: 4,
    desc: 'tra la la al'
  };

  taskData = [
    {
      name: 'Test',
      date: '12/11/2018',
      time: '10:10:10',
      userId: 4,
      desc: 'tra la la al'
    },
    {
      name: 'Test2',
      date: '12/12/2018',
      time: '10:12:10',
      userId: 4,
      desc: 'tra ld222 222 222a la al'
    },

  ];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string,
              private cd: ChangeDetectorRef,
              private dialog: MatDialog) {
    http.get<Task[]>(baseUrl + 'api/Task/GetTasks').subscribe(result => {
      this.tasks = result;
      console.log(result);
    }, error => console.error(error));
  }

  ngOnInit() {
    this.generateDate(0);

  }

  openDialog() {
    const dialogRef = this.dialog.open(AddTaskDialogComponent);
  }

  fillDaysData() {
    this.daysData.length = 0;
    // for (let i = 0; i <= moment(this.date).daysInMonth(); i++) {
    // }
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
    this.cd.detectChanges();
  }

  previousMon(): void {
    this.generateDate(-1);
    this.fillDaysData();
    this.cd.detectChanges();
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

interface Task {
  id: string;
  userId: string;
  name: string;
  date: string;
  time: string;
}

