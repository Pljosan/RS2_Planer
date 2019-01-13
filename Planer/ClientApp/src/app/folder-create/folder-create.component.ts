import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";




@Component({
  selector: 'app-folder-create',
  templateUrl: './folder-create.component.html'
})
export class FolderCreateComponent implements OnInit {
    public form: FormGroup;
    
    constructor(private http: HttpClient, private fb: FormBuilder,
                private dialogRef: MatDialogRef<FolderCreateComponent>) 
    { 
        this.form = this.fb.group({
            FolderName: [''],
            UserID: ['']
        });
    }

    save() {
        this.form.patchValue({UserID: '2'}); 
        this.dialogRef.close({"form": this.form.value});
    }

    close() {
        this.dialogRef.close();
    }

    ngOnInit() {}
}
