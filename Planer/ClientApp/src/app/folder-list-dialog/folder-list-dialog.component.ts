import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";


@Component({
  selector: 'app-folder-list-dialog',
  templateUrl: './folder-list-dialog.component.html'
})
export class FolderListDialogComponent implements OnInit {
    // public form: FormGroup;
    public foldersMap: Map<string, Array<string>>;

    public folderContents: Folder;
    public subfolders: Array<string>;
    public files: Array<string>;
    public baseUrl: string;

    constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private fb: FormBuilder, private dialogRef: MatDialogRef<FolderListDialogComponent>) { 
        // this.form = this.fb.group({
        //     Destination: ['']
        //  });
         this.baseUrl = baseUrl;

         this.foldersMap = new Map<string, Array<string>>();

         var user: User;
         user = new User(2); 

         http.post<Folder>(baseUrl + 'api/Folder/getRootFolder', user).subscribe(result => {
            this.setContentsAfterPost(result, false);
          }, error => console.error(error));
    }

    save(path : string) {
        this.dialogRef.close({"Destination": path});
    }

    close() {
        this.dialogRef.close();
    }

    getConentsOfFolder(path: string) {
        console.log("hi from path: " + path);

        var folder: Folder;
        folder = new Folder();        
        folder.userID = 2;
        folder.groupID = 0;
        folder.path = path;

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
                folder = new Folder();
                folder.userID = 2;
                folder.groupID = 0;
                folder.path = key;    

                this.http.post<Folder>(this.baseUrl + 'api/Folder/getFolderContents', folder).subscribe(result => {
                    this.setContentsAfterPost(result, true);
                  }, error => console.error(error)); 
                  
                  return;
            }
        });
    }

    setContentsAfterPost(result: Folder, back: boolean) {
        this.folderContents = result;
        this.files = Array.from(Object.keys(result.files));
        this.subfolders = Array.from(Object.keys(result.subfolders));

        if (!back) {
            this.foldersMap.set(this.folderContents.path, this.subfolders);       
        }
    }

    ngOnInit() {}
}

class Folder {

    userID: number;
    groupID: number;
    path: string;
    files: Map<string, string>;
    subfolders: Map<string, string>;
    name: string;
}

class User {
    constructor (UserID: number) {
        this.UserID = UserID;
    }

    UserID: number;
}