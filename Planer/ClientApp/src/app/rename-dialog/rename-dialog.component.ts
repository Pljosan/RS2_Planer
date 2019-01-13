import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";


@Component({
  selector: 'app-rename-dialog',
  templateUrl: './rename-dialog.component.html'
})
export class RenameDialogComponent implements OnInit {
    public form: FormGroup;

    constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<RenameDialogComponent>) { 
        this.form = this.fb.group({
            Name: ['']
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