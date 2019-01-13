import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";


@Component({
  selector: 'app-link-monitor',
  templateUrl: './link-monitor.component.html',
})
export class LinkMonitorComponent implements OnInit {
    public baseUrl: string;

    constructor (private http: HttpClient, @Inject('BASE_URL') baseUrl: string) { 
        this.baseUrl = baseUrl;
    }

    ngOnInit() {

    }

    writeDate() {
        this.http.get(this.baseUrl + 'api/LinkMonitor/getModifyDate').subscribe(result => {
            console.log(result);
          }, error => console.error(error));
    }
    
}
