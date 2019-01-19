import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AppMaterialModule} from './app-material.module';
import { CalendarComponent } from './calendar/calendar.component';
import { UsersComponent } from './users/users.component';
import {FetchDataComponent} from "./fetch-data/fetch-data.component";
import {FileUploadComponent} from "./file-upload/file-upload.component";
import {FetchFoldersComponent} from "./fetch-folders/fetch-folders.component";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { DayComponent } from './day/day.component';
import { AddTaskDialogComponent } from './add-task-dialog/add-task-dialog.component';
import { LoginComponent } from './login/login.component';
import {MatDialogModule} from "@angular/material";
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider} from "angularx-social-login";
import { RegistrationComponent } from './registration/registration.component';


let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("93909412184-hds3r63pv5fth76u4rbb2qu8qbu0b3qb.apps.googleusercontent.com")
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("367602984042716")
  }
]);
 
export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    UsersComponent,
    FetchDataComponent,
    DayComponent,
    AddTaskDialogComponent,
    FetchDataComponent,
    LoginComponent,
    FileUploadComponent,
    FetchFoldersComponent,
    RegistrationComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    SocialLoginModule
  ],
  entryComponents: [
    AddTaskDialogComponent,
    FileUploadComponent,
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
