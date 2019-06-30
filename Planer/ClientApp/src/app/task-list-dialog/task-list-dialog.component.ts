import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";


@Component({
  selector: 'app-task-list-dialog',
  templateUrl: './task-list-dialog.component.html'
})
export class TaskListDialogComponent implements OnInit {
    public form: FormGroup;

    constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<TaskListDialogComponent>) { 
        this.form = this.fb.group({
            
         });
    }

    save() {
        this.dialogRef.close({"form": this.form.value});
    }

    close() {
        this.dialogRef.close();
    }

    ngOnInit() {}

}