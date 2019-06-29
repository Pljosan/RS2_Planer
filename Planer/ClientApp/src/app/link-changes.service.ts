import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LinkChangesService {
  
  public changesExist: boolean;
  private baseUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  public checkIfChangesExist(userId: number) {
    return this.http.get<Map<string, Object>>(this.baseUrl + 'api/LinkMonitor/checkIfChangesExist/' + userId);
  }

}
