import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-fetch-folders',
  templateUrl: './fetch-folders.component.html'
})
export class FetchFoldersComponent {

    public foldersMap: Map<string, Array<string>>;

    public folderContents: Folder;
    public subfolders: Array<string>;
    public files: Array<string>;
    public baseUrl: string;
    
    constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) { 
        this.baseUrl = baseUrl;

        this.foldersMap = new Map<string, Array<string>>();

        var user: User;
        user = new User(2);        

        http.post<Folder>(baseUrl + 'api/Folder/getRootFolder', user).subscribe(result => {
            this.setContentsAfterPost(result, false);
          }, error => console.error(error));
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