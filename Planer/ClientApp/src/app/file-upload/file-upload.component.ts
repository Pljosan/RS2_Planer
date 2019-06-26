import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { EncrDecrService } from '../encr-decr/encr-decr-service.service';


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
    public file: File;
    public form: FormGroup;
    public switch = false;
    private loggedUserId: number;
    
    constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<FileUploadComponent>, private EncrDecr: EncrDecrService) { 
       this.form = this.fb.group({
            FileName: [''],
            isUserInputName: [''],
            UserID: ['']
        });
        this.loggedUserId = parseInt(this.EncrDecr.get('123456$#@$^@1ERF', sessionStorage.getItem('id')));
    }

    handleFileInput(files: FileList) {
        this.file = files[0];
    }

    save() {
        this.form.patchValue({UserID: this.loggedUserId.toString()}); 
        this.dialogRef.close({"form": this.form.value, "file": this.file});
    }

    close() {
        this.dialogRef.close();
    }

    ngOnInit() {

    }

    onChangeSlider() {
        console.log("switch: " + this.switch);
        this.switch = !this.switch; 
    }
    
}


interface FileUpload {
  UserID: number,
  FileName: string,
  FileObj: File,
  isUserInputName: boolean
}
