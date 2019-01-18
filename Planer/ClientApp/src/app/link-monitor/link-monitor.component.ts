import { Component, Inject, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interval } from 'rxjs';
import { AddLinkDialogComponent } from "../add-link-dialog/add-link-dialog.component"
import { MatDialog, MatDialogConfig } from "@angular/material";

@Component({
  selector: 'app-link-monitor',
  templateUrl: './link-monitor.component.html',
})
export class LinkMonitorComponent implements OnInit {
    public baseUrl: string;
    @ViewChild('additionsDiv') additionsDiv: ElementRef;

    public additions : Array<string>;
    private timer;
    public notificationClicked : boolean;

    constructor (private dialog: MatDialog, private http: HttpClient, @Inject('BASE_URL') baseUrl: string) { 
        this.baseUrl = baseUrl;
        this.notificationClicked = true;
        this.additions = new Array<string>();

        this.getChanges();
    }

    ngOnInit() {
        this.timer = interval(60*1000)
                    .subscribe(data => {
                        this.getChanges();
                    });
    }

    ngOnDestroy() {
        this.timer.unsubscribe();
    }

    checkOffNotification() {
        this.notificationClicked = true;
        this.additions.length = 0;
    }

    getChanges() {
        this.http.get(this.baseUrl + 'api/LinkMonitor/getModifyDate').subscribe(result => {
            console.log(result);
            // result = result.toString
            if (result["additions"].length > 0) {
                this.additionsDiv.nativeElement.innerHTML = "";

                result["additions"].forEach(element => {
                    this.additions.push(element);
                })
                this.additions.forEach(element => {
                    this.additionsDiv.nativeElement.innerHTML += element;    
                });

                this.notificationClicked = false;
            }
          }, error => console.error(error));
    }

    
    openAddLinkDialog() {

        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;

        const dialogRef = this.dialog.open(AddLinkDialogComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(
            data => {
                if (!data) {
                    console.log("closed");
                    return;
                }

                // console.log("userid: "  + data["form"].UserID);
    
                var formData = new FormData();
                if (data["form"].Url) {
                    formData.append("Url", data["form"].Url);
                }

                formData.append("UserID", "2");
               
                this.submitFormData(formData);
            });
    }

    submitFormData(formData: FormData) {

        this.http.post(this.baseUrl + 'api/LinkMonitor/AddNewLink', formData ).subscribe(status => {
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
        });
    }
}


class User {
    constructor (UserID: number) {
        this.UserID = UserID;
    }

    UserID: number;
}