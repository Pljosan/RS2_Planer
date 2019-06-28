import { Component, Inject, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interval } from 'rxjs';
import { AddLinkDialogComponent } from "../add-link-dialog/add-link-dialog.component"
import { MatDialog, MatDialogConfig } from "@angular/material";
import { EncrDecrService } from '../encr-decr/encr-decr-service.service';

@Component({
  selector: 'app-link-monitor',
  templateUrl: './link-monitor.component.html',
})
export class LinkMonitorComponent implements OnInit {
    public baseUrl: string;
    @ViewChild('additionsDiv') additionsDiv: ElementRef;

    public additions : Array<string>;
    private timer;
    public notificationClicked : Map<string, Boolean>;
    public changesPerLink : Map<string, Array<string>>;
    private loggedUserId: number;
    private linkIdMap: Map<string, number>;


    constructor (private dialog: MatDialog, private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private EncrDecr: EncrDecrService) { 
        this.baseUrl = baseUrl;
        this.additions = new Array<string>();
        this.changesPerLink = new Map<string, Array<string>>();
        this.notificationClicked = new Map<string, Boolean>();
        this.loggedUserId = parseInt(this.EncrDecr.get('123456$#@$^@1ERF', sessionStorage.getItem('id')));
        this.linkIdMap = new Map<string, number>();
        
    }

    objectKeys(map : Map<string, Array<string>>) {
        return Array.from( map.keys() );
    }

    getValues(map : Map<string, Array<string>>, link : string) {
        return map.get(link);
    }

    ngOnInit() {
        this.timer = interval(30*1000)
                    .subscribe(data => {
                        this.getChanges();
                    });
        this.getLinks();
    }

    ngOnDestroy() {
        console.log("timer stopped");
        this.timer.unsubscribe();
    }

    checkOffNotification(link : string) {
        this.notificationClicked.set(link, true);
        this.changesPerLink.set(link, new Array<string>());
    }

    isClicked(link : string) {
        if (this.notificationClicked.get(link)) {
            return true;
        }
        return false;
    }

    deleteLink(link : string) {
        var linkToDelete = this.linkIdMap.get(link);

        this.http.delete(this.baseUrl + 'api/LinkMonitor/DeleteLink/' + linkToDelete).subscribe(status => {
            if (status['result']) {
                console.log("jeeej");
                this.changesPerLink.delete(link);
                this.notificationClicked.delete(link);
                this.getLinks();
            }
            else {
                console.log("Delete failed");
            }

        });
    }

    getLinks() {
        this.http.get<Map<string, Object>>(this.baseUrl + 'api/LinkMonitor/getLinks/' + this.loggedUserId).subscribe(result => {
            console.log(result);
            result["links"].forEach(link => {
                console.log("url " + link.url);
                console.log("user ");
                console.log(link.user);
                console.log("userid " + link.user.userID)
                this.changesPerLink.set(link.url, new Array<string>());
                this.notificationClicked.set(link.url, true);
                this.linkIdMap.set(link.url, link.linkID);
            });
        }, error => console.error(error));
    }

    getChanges() {
        this.http.get<Map<string, Object>>(this.baseUrl + 'api/LinkMonitor/getModifyDate/' + this.loggedUserId).subscribe(result => {
            var changes = result["additions"];
            Object.keys(changes).forEach(key => {
                if (changes[key].length > 0) {
                    if (changes[key].length <= 5) {
                        this.changesPerLink.set(key, changes[key]);
                        this.notificationClicked.set(key, false);
                    }
                }
            });

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
                var formData = new FormData();
                if (data["form"].Url) {
                    formData.append("Url", data["form"].Url);
                }

                formData.append("UserID", this.loggedUserId.toString());
               
                this.submitFormData(formData);
            });
    }

    submitFormData(formData: FormData) {

        this.http.post(this.baseUrl + 'api/LinkMonitor/AddNewLink', formData ).subscribe(status => {
            if (status['result']) {
                console.log("jeeej");
                this.getLinks();
            }
            else {
                if (status["error_code"] == 421) {
                    console.log("file with that name already exists");
                }
                else {
                    console.log("form validation failed");
                }
            }
        });
    }
}


class User {
    constructor (UserID: number) {
        this.userID = UserID;
    }

    userID: number;
}

class Link {
    constructor (url : string, user : User) {
        this.url = url;
        this.user = user;
    }

    url: string;
    user: User;
}