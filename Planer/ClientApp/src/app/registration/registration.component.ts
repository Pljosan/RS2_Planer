import {Component, OnInit, Inject} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  public firstName : string;
  public lastName : string;
  public email : string;
  public password1 : string;
  public password2 : string;
  public registationValid : boolean;
  public baseUrl : string;
  public http : HttpClient;
  public form : FormControl;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, private router: Router) { 
    this.baseUrl = baseUrl;
    this.http = http;
  }

  ngOnInit() {
  }

  register() : void {
    if(this.password2 != this.password1){
      alert("Not the same password");
    } else {
      var user : User;
      user = new User(this.firstName, this.lastName, this.email, this.password1);
      this.http.post<boolean>(this.baseUrl + 'api/User/Register', user).subscribe(result => {
        console.log(result);
        if(result){
          alert("Registration succided for user " + user.firstName + " " + user.lastName);
          this.form.reset();
        }else{
          alert("Invalid");
        }
      }, error => console.error(error));
    }
  }

}

class User {

  constructor (firstName: string, lastName: string, email: string, password: string) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.password = password;
      this.email = email;
      this.rootFolderLocation = null;
  }

  userID: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  rootFolderLocation: string;
}
