import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AppMaterialModule} from './app-material.module';
import { CalendarComponent } from './calendar/calendar.component';
import { UsersComponent } from './users/users.component';
import {FetchDataComponent} from "./fetch-data/fetch-data.component";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { DayComponent } from './day/day.component';
import { AddTaskDialogComponent } from './add-task-dialog/add-task-dialog.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    UsersComponent,
    FetchDataComponent,
    DayComponent,
    AddTaskDialogComponent
    FetchDataComponent,
    LoginComponent
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
  ],
  entryComponents: [
    AddTaskDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
