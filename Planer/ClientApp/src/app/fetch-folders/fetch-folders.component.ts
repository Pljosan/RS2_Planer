import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {MatDialog, MatDialogConfig} from "@angular/material";
import { FileUploadComponent } from '../file-upload/file-upload.component';



@Component({
  selector: 'app-fetch-folders',
  templateUrl: './fetch-folders.component.html'
})
export class FetchFoldersComponent implements OnInit {

    public foldersMap: Map<string, Array<string>>;

    public folderContents: Folder;
    public subfolders: Array<string>;
    public files: Array<string>;
    public baseUrl: string;
    
    constructor(private http: HttpClient, private dialog: MatDialog, @Inject('BASE_URL') baseUrl: string) { 
        this.baseUrl = baseUrl;

        this.foldersMap = new Map<string, Array<string>>();

        var user: User;
        user = new User(2);        

        http.post<Folder>(baseUrl + 'api/Folder/getRootFolder', user).subscribe(result => {
            this.setContentsAfterPost(result, false);
          }, error => console.error(error));
    }
    
    ngOnInit() {

    }

    setContentsAfterPost(result: Folder, back: boolean) {
        this.folderContents = result;
        this.files = Array.from(Object.keys(result.files));
        this.subfolders = Array.from(Object.keys(result.subfolders));

        if (!back) {
            this.foldersMap.set(this.folderContents.path, this.subfolders);       
        }
    }

    getConentsOfFolder(path: string) {
        console.log("hi from path: " + path);

        var folder: Folder;
        folder = new Folder(2, 0, path, "test");        

        this.http.post<Folder>(this.baseUrl + 'api/Folder/getFolderContents', folder).subscribe(result => {
            this.setContentsAfterPost(result, false);
          }, error => console.error(error));        
    }

    goToPreviousFolder(path: string) {
        this.foldersMap.forEach((value: Array<string>, key: string) => {
            console.log("hi from key " + key);
            value.forEach((v: string) => {console.log("value: " + v)});    

            if (value.includes(path)) {
                var folder: Folder;
                folder = new Folder(2, 0, key, "test");    

                this.http.post<Folder>(this.baseUrl + 'api/Folder/getFolderContents', folder).subscribe(result => {
                    this.setContentsAfterPost(result, true);
                  }, error => console.error(error)); 
                  
                  return;
            }
        });
    }

    openFileUploadDialog(path: string) {

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
                
                var formData = new FormData();
                if (data["form"].FileName) {
                    formData.append("FileName", data["form"].FileName);
                }
                if (data["form"].isUserInputName) {
                    formData.append("isUserInputName", data["form"].isUserInputName);
                } 
                else {
                    formData.append("isUserInputName", "false");
                }
                formData.append("UserID", "2");
                formData.append("File", data["file"], data["file"].name);
                formData.append("DestFolder", path);

                this.submitFormData(formData);
            });
    }

    submitFormData(formData : FormData) {

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
            // window.location.reload();
            this.getConentsOfFolder(formData.get("DestFolder").toString());
        });
    }
}

class User {
    constructor (UserID: number) {
        this.UserID = UserID;
    }

    UserID: number;
}

class Folder {

    constructor (userID: number, groupID: number, path: string, name: string) {
        this.userID = userID;
        this.groupID = groupID;
        this.path = path;
        this.name = name;
    }

    userID: number;
    groupID: number;
    path: string;
    files: Map<string, string>;
    subfolders: Map<string, string>;
    name: string;
}

interface FileUpload {
    UserID: number,
    FileName: string,
    FileObj: File,
    isUserInputName: boolean
  }