import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { EncrDecrService } from '../encr-decr/encr-decr-service.service';



@Component({
  selector: 'app-folder-create',
  templateUrl: './folder-create.component.html'
})
export class FolderCreateComponent implements OnInit {
    public form: FormGroup;
    private loggedUserId: number;
    
    constructor(private http: HttpClient, private fb: FormBuilder,
                private dialogRef: MatDialogRef<FolderCreateComponent>,
                private EncrDecr: EncrDecrService) 
    { 
        this.form = this.fb.group({
            FolderName: [''],
            UserID: ['']
        });
        this.loggedUserId = parseInt(this.EncrDecr.get('123456$#@$^@1ERF', sessionStorage.getItem('id')));
    }

    save() {
        this.form.patchValue({UserID: this.loggedUserId.toString()}); 
        this.dialogRef.close({"form": this.form.value});
    }

    close() {
        this.dialogRef.close();
    }

    ngOnInit() {}
}
