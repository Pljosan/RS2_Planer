import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import * as moment from 'moment';
import {AddTaskDialogComponent} from "../add-task-dialog/add-task-dialog.component";
import { EncrDecrService } from '../encr-decr/encr-decr-service.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-day-tasks-dialog',
  templateUrl: './day-tasks-dialog.component.html',
  styleUrls: ['./day-tasks-dialog.component.scss']
})
export class DayTasksDialogComponent implements OnInit {
  tasks;
  taskFiles;
  going = false;
  loggedUserId;
  taskUsers = [];

  constructor(
    private dialogRef: MatDialogRef<AddTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string,
    private EncrDecr: EncrDecrService) {

    this.loggedUserId = parseInt(this.EncrDecr.get('123456$#@$^@1ERF', sessionStorage.getItem('id')));

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
    this.fetchUsersForTask();
  }

  ngOnInit() {
  }

  registerInterest(task: any) {
    console.log(task);
    this.http.post(this.baseUrl + 'api/UserTask/AddUserTask', {"task": new Task(task.taskID), "user": new User(this.loggedUserId)} ).subscribe(status => {
        console.log(status);
    });
  }

  fetchUsersForTask() {
    this.tasks.forEach(element => {
        this.http.get<UserTask[]>(this.baseUrl + 'api/UserTask/GetAllUsersForTask/' + element.taskID).subscribe(result => {
            // console.log(result);
            this.taskUsers[element.taskID] = result;

            console.log("taskUsers");
            console.log(this.taskUsers);
        }, error => console.error(error));
    });
  }

  dateFormat() {
    return moment(this.tasks[0].date).format('ddd DD MMM YYYY')
  }

  addNewTaskDialogOpen() {
    this.dialogRef.close('addNew');
  }

}

class FileUpload {

  UserID: number;
  FileName: string;
  FileObj: File;
  isUserInputName: boolean;
}

class Task {
    constructor(id) {
        this.taskID = id;
    }

    taskID: number;
}

class User {
    constructor (UserID: number) {
        this.userID = UserID;
    }

    userID: number;
    firstName: string;
    lastName: string;
}

class UserTask {

    user: User;
    task: Task;
}
