import { Component, Inject, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interval } from 'rxjs';


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

    constructor (private http: HttpClient, @Inject('BASE_URL') baseUrl: string) { 
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
    
}
