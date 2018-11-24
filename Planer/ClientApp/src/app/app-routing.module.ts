import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CalendarComponent} from './calendar/calendar.component';
import {AppComponent} from './app.component';
import {UsersComponent} from './users/users.component';
import {FetchDataComponent} from "./fetch-data/fetch-data.component";
import {FileUploadComponent} from "./file-upload/file-upload.component";
import {FetchFoldersComponent} from "./fetch-folders/fetch-folders.component";

const routes: Routes = [
  // {path: '', component: AppComponent, pathMatch: 'full'},
  {path: 'calendar', component: CalendarComponent},
  {path: 'users', component: UsersComponent},
  {path: 'fetch-data', component: FetchDataComponent},
  {path: 'file-upload', component: FileUploadComponent},
  {path: 'fetch-folders', component: FetchFoldersComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
