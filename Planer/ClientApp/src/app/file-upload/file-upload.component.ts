import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
    public file: File;
    public form: FormGroup;
    public switch = false;
    
    constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<FileUploadComponent>) { 
       this.form = this.fb.group({
            FileName: [''],
            isUserInputName: [''],
            UserID: ['']
        });
    }

    handleFileInput(files: FileList) {
        this.file = files[0];
    }

    save() {
        this.form.patchValue({UserID: '2'}); 
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
