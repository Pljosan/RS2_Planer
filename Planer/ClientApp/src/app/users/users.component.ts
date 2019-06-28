import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { EncrDecrService } from '../encr-decr/encr-decr-service.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  private loggedUserId : number;
  private baseUrl : string;
  private user : User;

  constructor(private dialog: MatDialog, private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private EncrDecr: EncrDecrService) { 
    this.loggedUserId = parseInt(this.EncrDecr.get('123456$#@$^@1ERF', sessionStorage.getItem('id')));
    this.baseUrl = baseUrl;
  }

  ngOnInit() {
    this.http.get<User>(this.baseUrl + 'api/User/GetUserInfo/' + this.loggedUserId).subscribe(result => {
      console.log(result);
        this.user = result;
      },
    error => console.error(error));
  }

}


class User {
  constructor () {}

  userID: number;
  firstName: string;
  lastName: string;
  email: string;
}
