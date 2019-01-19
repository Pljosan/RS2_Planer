import {Component, OnInit, Inject} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material'
import {AuthService} from 'angularx-social-login';
import {SocialUser} from 'angularx-social-login';
import {GoogleLoginProvider, FacebookLoginProvider} from 'angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  public socialUser : SocialUser;
  public user : User;
  public email: string;
  public password: string;
  public baseUrl : string;
  public http : HttpClient;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, private router: Router, private authService: AuthService) {
    this.baseUrl = baseUrl;
    this.http = http;
  }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.socialUser = user;
    });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  login(): void {
    // if(this.users.find(x => (x.email == this.email && x.password == this.password)) != null){
    //   this.router.navigate(["users"]);
    // } else {
    //   alert("Invalid credentials");
    // }
    var newUser : User;
    newUser = new User(this.email, this.password);
    this.http.post<User>(this.baseUrl + 'api/User/GetUser', newUser).subscribe(result => {
      console.log(result);
      if(result){
        this.user = result;
        this.router.navigate(["users"]);
      }else{
        alert("Invalid credentials");
      }}, error => console.error(error));

  }

  /*login1(): void {
    if (this.username == 'admin' && this.password == 'admin') {
      this.router.navigate(["users"]);
    } else {
      alert("Invalid credentials");
    }
  }*/

}

class User {

  constructor (email: string, password: string) {
      this.Password = password;
      this.Email = email;
      this.FirstName = null;
      this.LastName = null;
      this.RootFolderLocation = null;
  }

  UserID: number;
  FirstName: string;
  LastName: string;
  Email: string;
  Password: string;
  RootFolderLocation: string;
}
