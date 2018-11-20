import {Injectable} from '@angular/core';
import {AppConfig} from '../config';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from './user';
import {catchError} from 'rxjs/operators';
import {BaseService} from './base.service';
import {Helpers} from './helpers/helpers';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {

  private pathAPI = ''; // FIXME
  constructor(private http: HttpClient,
              private config: AppConfig,
              helper: Helpers
              ) {
    super(helper);
  }

  getUsers(): Observable<any> {
    return this.http.get(this.pathAPI + 'user', super.header()).pipe(catchError(super.handleError));
  }

}
