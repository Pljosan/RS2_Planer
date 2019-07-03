import {Component, Inject, OnInit} from '@angular/core';
import * as moment from 'moment';
import {FormControl, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {HttpClient} from "@angular/common/http";
import { EncrDecrService } from '../encr-decr/encr-decr-service.service';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DEFAULT_OPTIONS } from "@angular/material";
import { FileUploadComponent } from '../file-upload/file-upload.component';
import { Task } from '../calendar/task.model';

@Component({
  selector: 'app-add-task-dialog',
  templateUrl: './add-task-dialog.component.html',
  styleUrls: ['./add-task-dialog.component.scss']
})
export class AddTaskDialogComponent implements OnInit {

  task = {
    name: 'Test',
    date: '12/11/2018',
    time: '10:10:10',
    userId: 4,
    desc: 'tra la la al'
  };

  form: FormGroup;
  loggedUserId: number;
  formData: FormData;

  xxx = moment().format('YYYY-MM-DD');

  constructor(
    private dialogRef: MatDialogRef<AddTaskDialogComponent>,
    public http: HttpClient,
    private EncrDecr: EncrDecrService,
    @Inject('BASE_URL') public baseUrl: string,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog
  ) {
    this.loggedUserId = parseInt(this.EncrDecr.get('123456$#@$^@1ERF', sessionStorage.getItem('id')));
    this.formData = new FormData();
  }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(''),
      date: new FormControl(this.data.date.format('YYYY-MM-DD')),
      time: new FormControl(),
      user: new FormControl(new User(this.loggedUserId))
    })
  }

  submitTask() {
    console.log(this.form.value);
    var task;
    // this.dialogRef.close('submit');
    this.http.post<Task>(this.baseUrl + 'api/Task/AddTask', this.form.value).subscribe(res => {
      console.log(res);
      task = res;

      this.formData.append("TaskID", task.taskID);
      this.submitFormData(this.formData);
      this.dialogRef.close('submitted');
    });
    
  }

  openFileUploadDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(FileUploadComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
        data => {
            if (!data) {
                console.log("closed");
                return;
            }

            console.log("userid: "  + data["form"].UserID);
            
            if (data["form"].FileName) {
              this.formData.append("FileName", data["form"].FileName);
            }
            if (data["form"].isUserInputName) {
              this.formData.append("isUserInputName", data["form"].isUserInputName);
            } 
            else {
              this.formData.append("isUserInputName", "false");
            }
            this.formData.append("UserID", this.loggedUserId.toString());
            this.formData.append("File", data["file"], data["file"].name);
            this.formData.append("DestFolder", "");
    });
  }

  submitFormData(formData: FormData) {

    this.http.post<FileUpload>(this.baseUrl + 'api/FileUpload/UploadFileForm', formData ).subscribe(status => {
        if (status['result']) {
            console.log("jeeej");
        }
        else {
            if (status["error_code"] == 421) {
                console.log("file with that name already exists");
            }
            else {
                console.log("form validation failed");
            }
        }
    });
  }
}

class User {
  constructor (userID: number) {
    this.userID = userID;
  }

  userID: number;
}

class FileUpload {

  UserID: number;
  FileName: string;
  FileObj: File;
  isUserInputName: boolean;
}