import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { FileUploadComponent } from '../file-upload/file-upload.component';
import { FolderCreateComponent } from '../folder-create/folder-create.component';
import { RenameDialogComponent } from '../rename-dialog/rename-dialog.component';
import { FolderListDialogComponent } from '../folder-list-dialog/folder-list-dialog.component';
import { TaskListDialogComponent } from '../task-list-dialog/task-list-dialog.component';
import { EncrDecrService } from '../encr-decr/encr-decr-service.service';

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
    private loggedUserId: number;
    public checkedFilesExist: boolean;
    public checkedFiles: Map<string, string>;

    constructor(private http: HttpClient, private dialog: MatDialog, @Inject('BASE_URL') baseUrl: string, private EncrDecr: EncrDecrService) { 
        this.baseUrl = baseUrl;

        this.foldersMap = new Map<string, Array<string>>();
        this.checkedFiles = new Map<string, string>();
        this.checkedFilesExist = false;

        var user: User;
        this.loggedUserId = parseInt(this.EncrDecr.get('123456$#@$^@1ERF', sessionStorage.getItem('id')));
        console.log("User id: " + this.loggedUserId);
        user = new User(this.loggedUserId); 
        
        http.get<Folder>(baseUrl + 'api/Folder/getRootFolder/' + user.userID).subscribe(result => {
            this.setContentsAfterPost(result, false);
          }, error => console.error(error));
    }
    
    ngOnInit() {

    }

    addFileToCheckedFiles(event: any, file: string) {
        console.log("checked value: ");
        console.log(event);

        if (event.checked) {
            this.checkedFiles.set(event.source.id, file);
            this.checkedFilesExist = true;
        } else {
            this.checkedFiles.delete(event.source.id);
            if (this.checkedFiles.size == 0) {
                this.checkedFilesExist = false;
            }
        }
    }

    openAssignToTaskDialog() {
        console.log(this.checkedFiles);

        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;

        const dialogRef = this.dialog.open(TaskListDialogComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(
            data => {
                if (!data) {
                    console.log("closed");
                    return;
                }

                // console.log("userid: "  + data["form"].UserID);
                
                // var formData = new FormData();
                // if (data["form"].FileName) {
                //     formData.append("FileName", data["form"].FileName);
                // }
                // if (data["form"].isUserInputName) {
                //     formData.append("isUserInputName", data["form"].isUserInputName);
                // } 
                // else {
                //     formData.append("isUserInputName", "false");
                // }
                // formData.append("UserID", this.loggedUserId.toString());
                // formData.append("File", data["file"], data["file"].name);
                // formData.append("DestFolder", path);

                // this.submitFormData(formData);
            });
    }

    setContentsAfterPost(result: Folder, back: boolean) {
        this.folderContents = result;
        this.files = Array.from(Object.keys(result.files));
        this.subfolders = Array.from(Object.keys(result.subfolders));

        this.files.sort();
        this.subfolders.sort();

        if (!back) {
            this.foldersMap.set(this.folderContents.path, this.subfolders);       
        }
    }

    getConentsOfFolder(path: string) {
        console.log("hi from path: " + path);

        var folder: Folder;
        folder = new Folder();        
        folder.userID = this.loggedUserId;
        folder.groupID = 0;
        folder.path = path.replace(/\//g, "%2F");

        this.http.get<Folder>(this.baseUrl + 'api/Folder/getFolderContents/' + folder.userID + '/' + encodeURI(folder.path)).subscribe(result => {
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
                folder.path = key.replace(/\//g, "%2F");    

                this.http.get<Folder>(this.baseUrl + 'api/Folder/getFolderContents/' + folder.userID + '/' + encodeURI(folder.path)).subscribe(result => {
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
                formData.append("UserID", this.loggedUserId.toString());
                formData.append("File", data["file"], data["file"].name);
                formData.append("DestFolder", path);

                this.submitFormData(formData);
            });
    }

    openCreateFolderDialog(path: string) {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;

        const dialogRef = this.dialog.open(FolderCreateComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(
            data => {
                if (!data) {
                    console.log("closed");
                    return;
                }

                console.log("userid: "  + data["form"].UserID);
                
                var formData = new FormData();
                if (data["form"].FolderName) {
                    formData.append("Name", data["form"].FolderName);
                }

                formData.append("UserID", data["form"].UserID);
                formData.append("Path", path);

                this.submitFolderCreateFormData(formData);
        });        
    }

    renameFile(path: string) {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;

        const dialogRef = this.dialog.open(RenameDialogComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(
            data => {
                if (!data) {
                    console.log("closed");
                    return;
                }
                
                var formData = new FormData();
                if (data["form"].Name) {
                    formData.append("FileName", data["form"].Name);
                }

                formData.append("Path", path);

                this.submitRenameFormData(formData);
        });        
    }

    moveFile(path: string) {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;

        const dialogRef = this.dialog.open(FolderListDialogComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(
            data => {
                if (!data) {
                    console.log("closed");
                    return;
                }
                
                var formData = new FormData();
                if (data["Destination"]) {
                    formData.append("FileName", data["Destination"]);
                }

                formData.append("Path", path);

                this.submitMoveFormData(formData);
        });        
    }

    copyFile(path: string) {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;

        const dialogRef = this.dialog.open(FolderListDialogComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(
            data => {
                if (!data) {
                    console.log("closed");
                    return;
                }
                
                var formData = new FormData();
                if (data["Destination"]) {
                    formData.append("FileName", data["Destination"]);
                }

                formData.append("Path", path);

                this.submitCopyFormData(formData);
        });        
    }

    submitFormData(formData: FormData) {

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

    submitRenameFormData(formData: FormData) {

        this.http.put(this.baseUrl + 'api/FileUpload/RenameFile', formData ).subscribe(status => {
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
            var path = formData.get("Path").toString();
            this.getConentsOfFolder(path.substring(0, path.lastIndexOf("/") + 1).toString());
        });
    }

    submitMoveFormData(formData: FormData) {

        this.http.put(this.baseUrl + 'api/FileUpload/MoveFile', formData ).subscribe(status => {
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
            var path = formData.get("Path").toString();
            this.getConentsOfFolder(path.substring(0, path.lastIndexOf("/") + 1).toString());
        });
    }

    submitCopyFormData(formData: FormData) {

        this.http.put(this.baseUrl + 'api/FileUpload/CopyFile', formData ).subscribe(status => {
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
            var path = formData.get("Path").toString();
            this.getConentsOfFolder(path.substring(0, path.lastIndexOf("/") + 1).toString());
        });
    }

    submitFolderCreateFormData(formData: FormData) {

        this.http.post<FileUpload>(this.baseUrl + 'api/Folder/CreateNewFolder', formData ).subscribe(status => {
            if (status['result']) {
                console.log("jeeej");
            }
            else {
                if (status["error_code"] == 422) {
                    console.log("Folder with that name already exists");
                }
                else {
                    console.log("form validation failed");
                }
            }
            // window.location.reload();
            this.getConentsOfFolder(formData.get("Path").toString());
        });
    }

    deleteFolder(path: string) {

        console.log("deleting " + path);

        var folder = new Folder();
        folder.path = path.replace(/\//g, "%2F"); 

        this.http.delete(this.baseUrl + 'api/Folder/DeleteFolder/' + encodeURI(folder.path) ).subscribe(status => {
            if (status['result']) {
                console.log("jeeej");
            }
            else {
                if (status["error_code"] == 422) {
                    console.log("Folder with that name already exists");
                }
                else {
                    console.log("form validation failed");
                }
            }

            this.getConentsOfFolder(path.substr(0, path.lastIndexOf("/")));
        });
    }

    deleteFile(path: string) {

        var fileUpload = new FileUpload();
        fileUpload.FileName = path; 

        var encoded = path.replace(/\//g, "%2F");
        console.log("Encoded: " + encoded);
        var fullUrl = this.baseUrl + 'api/FileUpload/DeleteFile/' + encoded;
        console.log("Full url: " + fullUrl);
        this.http.delete(fullUrl).subscribe(status => {
            if (status['result']) {
                console.log("jeeej");
            }
            else {
                if (status["error_code"] == 422) {
                    console.log("Folder with that name already exists");
                }
                else {
                    console.log("form validation failed");
                }
            }

            this.getConentsOfFolder(path.substr(0, path.lastIndexOf("/")));
        });
    }

    downloadFile(path : string) {
        console.log("SUPER BITNO: " + path);

        var file = new FileUpload();
        file.FileName = path.replace(/\//g, "%2F");

        var ind = path.lastIndexOf("/");
        var name = path.substr(ind + 1);
        var extension = name.substr(name.lastIndexOf(".") + 1);

        this.http.get(this.baseUrl + 'api/FileUpload/DownloadFile/' + encodeURI(file.FileName), { responseType: 'blob' })
                 .subscribe(x => {
                    console.log("file name: " + name);
                    console.log("extension: " + extension);

                    // It is necessary to create a new blob object with mime-type explicitly set
                    // otherwise only Chrome works like it should
                    
                    var fileType = this.determineFileType(extension);
                                      
                    var newBlob = new Blob([x], { type: fileType });

                    // IE doesn't allow using a blob object directly as link href
                    // instead it is necessary to use msSaveOrOpenBlob
                    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                        window.navigator.msSaveOrOpenBlob(newBlob);
                        return;
                    }
        
                    // For other browsers: 
                    // Create a link pointing to the ObjectURL containing the blob.
                    const data = window.URL.createObjectURL(newBlob);
        
                    var link = document.createElement('a');
                    link.href = data;
                    link.download = name;
                    // this is necessary as link.click() does not work on the latest firefox
                    link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
        
                    setTimeout(function () {
                        // For Firefox it is necessary to delay revoking the ObjectURL
                        window.URL.revokeObjectURL(data);
                    }, 100);
                });
    }

    determineFileType(extension: string) {
        if (extension === "pdf")
            return "application/pdf";                    
        else if (extension === "7z")
            return "application/x-7z-compressed";
        else if (extension === "zip")
            return "application/zip";
        else if (extension === "xml")
            return "application/zip";
        else if (extension === "xlsx") 
            return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        else if (extension === "xls")
            return "application/vnd.ms-excel";
        else if (extension === "xhtml")
            return "application/xhtml+xml";
        else if (extension === "wav")
            return "audio/wav";
        else if (extension === "ts")
            return "application/typescript";
        else if (extension === "tar")
            return "application/x-tar";
        else if (extension === "sh") 
            return "application/x-sh";
        else if (extension === "rar")
            return "application/x-rar-compressed";
        else if (extension === "pptx")
            return "application/vnd.openxmlformats-officedocument.presentationml.presentation";
        else if (extension === "ppt")
            return "application/vnd.ms-powerpoint";
        else if (extension === "png")
            return "image/png";
        else if (extension === "odt")
            return "application/vnd.oasis.opendocument.text";
        else if (extension === "mpkg")
            return "application/vnd.apple.installer+xml";
        else if (extension === "mpeg")
            return "video/mpeg";
        else if (extension === "mp4")
            return "video/mp4";
        else if (extension === "mp3")
            return "audio/mp3";
        else if (extension === "mid" || extension === "midi")
            return "audio/midi";
        else if (extension === "json")
            return "application/json";
        else if (extension === "jpeg" || extension === "jpg")
            return "image/jpeg";
        else if (extension === "jar")
            return "application/java-archive";
        else if (extension === "ico")
            return "image/x-icon";
        else if (extension === "html" || extension === "htm")
            return "text/html";
        else if (extension === "gif")
            return "image/gif";
        else if (extension === "docx")
            return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
        else if (extension === "doc")
            return "application/msword";
        else if (extension === "csv")
            return "text/csv";
        else if (extension === "css")
            return "text/css";
        else if (extension === "bmp")
            return "image/bmp";
        else if (extension === "avi")
            return "video/x-msvideo";
        else if (extension === "flac")
            return "audio/flac";
        
        return "text/plain";
    }
}

class User {
    constructor (UserID: number) {
        this.userID = UserID;
    }

    userID: number;
}

class Folder {

    userID: number;
    groupID: number;
    path: string;
    files: Map<string, string>;
    subfolders: Map<string, string>;
    name: string;
}

class FileUpload {

    UserID: number;
    FileName: string;
    FileObj: File;
    isUserInputName: boolean;
}