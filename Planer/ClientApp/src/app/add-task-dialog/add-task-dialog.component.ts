import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import {FormControl, FormGroup} from "@angular/forms";

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

  constructor() { }

  ngOnInit() {
    console.log(this.xxx);
    this.form = new FormGroup({
      name: new FormControl('ttt'),
      date: new FormControl(this.xxx),
      time: new FormControl()
    })
  }

  submitTask() {
    console.log(this.form.value);
  }

}
