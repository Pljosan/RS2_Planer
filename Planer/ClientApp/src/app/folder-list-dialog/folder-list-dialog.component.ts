import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { EncrDecrService } from '../encr-decr/encr-decr-service.service';


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

    private loggedUserId: number;

    constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private fb: FormBuilder, private dialogRef: MatDialogRef<FolderListDialogComponent>, private EncrDecr: EncrDecrService) { 
        // this.form = this.fb.group({
        //     Destination: ['']
        //  });
         this.baseUrl = baseUrl;

         this.foldersMap = new Map<string, Array<string>>();

         this.loggedUserId = parseInt(this.EncrDecr.get('123456$#@$^@1ERF', sessionStorage.getItem('id')));
         var user: User;
         user = new User(this.loggedUserId); 

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
        folder.userID = this.loggedUserId;
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
                folder.userID = this.loggedUserId;
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