import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import {CalendarComponent} from './calendar/calendar.component';
import {AppComponent} from './app.component';
import {UsersComponent} from './users/users.component';
import {FetchDataComponent} from "./fetch-data/fetch-data.component";
import {LoginComponent} from './login/login.component';
import {FileUploadComponent} from "./file-upload/file-upload.component";
import {LinkMonitorComponent} from "./link-monitor/link-monitor.component";
import {FetchFoldersComponent} from "./fetch-folders/fetch-folders.component";
import { RegistrationComponent } from './registration/registration.component';
import { AuthGuardService as AuthGuard } from './auth-guard.service';

const routes: Routes = [
  // {path: '', component: AppComponent, pathMatch: 'full'},
  {path: 'calendar', component: CalendarComponent, canActivate: [AuthGuard]},
  {path: 'users', component: UsersComponent, canActivate: [AuthGuard]},
  {path: 'fetch-data', component: FetchDataComponent},
  {path: 'login', component: LoginComponent},
  {path: 'file-upload', component: FileUploadComponent, canActivate: [AuthGuard]},
  {path: 'fetch-folders', component: FetchFoldersComponent, canActivate: [AuthGuard]},
  {path: 'link-monitor', component: LinkMonitorComponent, canActivate: [AuthGuard]},
  {path: 'registration', component: RegistrationComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
