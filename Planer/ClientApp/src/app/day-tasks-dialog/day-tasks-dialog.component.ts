import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import * as moment from 'moment';
import {AddTaskDialogComponent} from "../add-task-dialog/add-task-dialog.component";

@Component({
  selector: 'app-day-tasks-dialog',
  templateUrl: './day-tasks-dialog.component.html',
  styleUrls: ['./day-tasks-dialog.component.scss']
})
export class DayTasksDialogComponent implements OnInit {
  tasks;
  taskFiles;

  constructor(
    private dialogRef: MatDialogRef<AddTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    // console.log(moment(this.data.tasks[1].time, 'HH:mm').format('HH:mm'));
    this.tasks = this.data.tasks.sort((a,b) => {
      if (moment(a.time, 'HH:mm').isAfter(moment(b.time, 'HH:mm'))) {
        return 1;
      }

      if (moment(a.time, 'HH:mm').isBefore(moment(b.time, 'HH:mm'))) {
        return -1;
      }

      return 0;
    });
    this.taskFiles = this.data.files;
  }

  ngOnInit() {
  }

  dateFormat() {
    return moment(this.tasks[0].date).format('ddd DD MMM YYYY')
  }

  addNewTaskDialogOpen() {
    this.dialogRef.close('addNew');
  }

}
