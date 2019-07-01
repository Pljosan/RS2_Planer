import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EncrDecrService } from '../encr-decr/encr-decr-service.service';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";


@Component({
  selector: 'app-task-list-dialog',
  templateUrl: './task-list-dialog.component.html'
})
export class TaskListDialogComponent implements OnInit {
    public tasks: Task[];
    private loggedUserId; number;
    private listOfTasks: Map<number, Task>;

    constructor(private dialogRef: MatDialogRef<TaskListDialogComponent>,
                private http: HttpClient, @Inject('BASE_URL') private baseUrl: string,
                private EncrDecr: EncrDecrService) { 

        this.listOfTasks = new Map<number, Task>();
        this.loggedUserId = parseInt(this.EncrDecr.get('123456$#@$^@1ERF', sessionStorage.getItem('id')));
    }

    save() {
        this.dialogRef.close({"task_list": this.listOfTasks});
    }

    close() {
        this.dialogRef.close();
    }

    ngOnInit() {
        this.http.get<Task[]>(this.baseUrl + 'api/Task/GetTasks/' + this.loggedUserId).subscribe(result => {
            this.tasks = result;
          }, error => console.error(error));
    }

    addTaskToListOfTasks(event: any, task: Task) {
        console.log("checked value: ");
        console.log(event);

        if (event.checked) {
            this.listOfTasks.set(event.source.id, task);
        } else {
            this.listOfTasks.delete(event.source.id);
        }
    }

}

class Task {
    id: string;
    user: User;
    name: string;
    date: string;
    time: string;
}