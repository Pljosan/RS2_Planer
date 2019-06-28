import {Component, Inject, OnInit} from '@angular/core';
import * as moment from 'moment';
import {FormControl, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {HttpClient} from "@angular/common/http";
import { EncrDecrService } from '../encr-decr/encr-decr-service.service';

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

  xxx = moment().format('YYYY-MM-DD');

  constructor(
    private dialogRef: MatDialogRef<AddTaskDialogComponent>,
    public http: HttpClient,
    private EncrDecr: EncrDecrService,
    @Inject('BASE_URL') public baseUrl: string,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl('ttt'),
      date: new FormControl(this.data.date.format('YYYY-MM-DD')),
      time: new FormControl(),
      userId: new FormControl(parseInt(this.EncrDecr.get('123456$#@$^@1ERF', sessionStorage.getItem('id'))))
    })
  }

  submitTask() {
    console.log(this.form.value);
    // this.dialogRef.close('submit');
    this.http.post(this.baseUrl + 'api/Task/AddTask', this.form.value).subscribe(res => {
      console.log(res);
      this.dialogRef.close('submitted');
    })
    // this.http.get<Task[]>(baseUrl + 'api/Task/GetTasks').subscribe(result => {
    //   this.tasks = result;
    //   console.log(this.tasks);
    //   this.fillDaysData();
    // }, error => console.error(error));
  }

}
