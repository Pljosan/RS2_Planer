import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-fetch-folders',
  templateUrl: './fetch-folders.component.html'
})
export class FetchFoldersComponent {

    public folderContents: Folder;
    public subfolders: Array<string>;
    public files: Array<string>;
    
    constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) { 
        var user: User;
        user = new User(2);        

        http.post<Folder>(baseUrl + 'api/Folder/getRootFolder', user).subscribe(result => {
            this.folderContents = result;
            this.files = Array.from(Object.keys(result.files));
            this.subfolders = Array.from(Object.keys(result.subfolders));
          }, error => console.error(error));
    }


    getConentsOfFolder(path) {
        console.log("hi from path: " + path);
    }
}

class User {
    constructor (UserID: number) {
        this.UserID = UserID;
    }

    UserID: number;
}

interface Folder {
    userID: number,
    groupID: number,
    path: string,
    files: Map<string, string>,
    subfolders: Map<string, string>,
    name: string
}