import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html'
})
export class FileUploadComponent {
    public baseUrl: string;
    public file: File;
    
    constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) { 
        this.baseUrl = baseUrl;
    }

    handleFileInput(files: FileList) {
        this.file = files[0];
    }

    onSubmit(fileValue : NgForm) {

        // const headers = new HttpHeaders().set('content-type', 'application/json');  

        var formData = new FormData();
        if (fileValue.value.FileName) {
            formData.append("FileName", fileValue.value.FileName);
        }
        if (fileValue.value.FileName) {
            formData.append("isUserInputName", fileValue.value.isUserInputName);
        } 
        else {
            formData.append("isUserInputName", "false");
        }
        formData.append("UserID", "2");
        formData.append("File", this.file, this.file.name);

        this.http.post<FileUpload>(this.baseUrl + 'api/FileUpload/UploadFileForm', formData ).subscribe(status => {
            if (status['result']) {
                console.log("jeeej");
            }
            else {
                console.log("fejl :/")
            }
        });
    }

    
}


interface FileUpload {
  UserID: number,
  FileName: string,
  File: File,
  isUserInputName: boolean
}
