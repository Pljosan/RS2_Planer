import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AppMaterialModule} from './app-material.module';
import { CalendarComponent } from './calendar/calendar.component';
import { UsersComponent } from './users/users.component';
import {FetchDataComponent} from "./fetch-data/fetch-data.component";
import {FileUploadComponent} from "./file-upload/file-upload.component";
import {RenameDialogComponent} from "./rename-dialog/rename-dialog.component";
import {FolderListDialogComponent} from "./folder-list-dialog/folder-list-dialog.component";
import {FolderCreateComponent} from "./folder-create/folder-create.component";
import {FetchFoldersComponent} from "./fetch-folders/fetch-folders.component";
import {LinkMonitorComponent} from "./link-monitor/link-monitor.component";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { DayComponent } from './day/day.component';
import { AddTaskDialogComponent } from './add-task-dialog/add-task-dialog.component';
import { LoginComponent } from './login/login.component';
import {MatDialogModule} from "@angular/material";
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';


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
    LinkMonitorComponent,
    FolderCreateComponent,
    RenameDialogComponent,
    FolderListDialogComponent,
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
  ],
  entryComponents: [
    AddTaskDialogComponent,
    FileUploadComponent,
    FolderCreateComponent,
    RenameDialogComponent,
    FolderListDialogComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
