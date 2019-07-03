import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { EncrDecrService } from '../encr-decr/encr-decr-service.service';
import { HttpClient } from '@angular/common/http';
import { Task } from '../calendar/task.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  private loggedUserId : number;
  private baseUrl : string;
  public user : User;
  public upcomingTasks : Array<Task>;
  public displayedColumns: string[] = ['name', 'date', 'time'];
  public displayedColumnsUser: string[] = ['firstName', 'lastName', 'email'];
  public userData: Array<User>;

  constructor(private dialog: MatDialog, private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private EncrDecr: EncrDecrService) { 
    this.loggedUserId = parseInt(this.EncrDecr.get('123456$#@$^@1ERF', sessionStorage.getItem('id')));
    this.baseUrl = baseUrl;
    this.upcomingTasks = new Array<Task>();
    this.userData = new Array<User>();
  }

  ngOnInit() {
    this.http.get<User>(this.baseUrl + 'api/User/GetUserInfo/' + this.loggedUserId).subscribe(result => {
      console.log(result);
        this.user = result;
        this.userData.push(this.user);
      },
    error => console.error(error));

    this.http.get<Array<Task>>(this.baseUrl + 'api/Task/GetUpcomingTasks/' + this.loggedUserId).subscribe(result => {
      console.log(result);
        this.upcomingTasks = result;
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
