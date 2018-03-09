import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { appConfig } from '../../app.config';

@Injectable()
export class GroupReportService {

  constructor(private http: HttpClient) { }

  getAll() {
    const apiURL = `${appConfig.apiUrl}/api/GroupReport`;
    return this.http.get<any>(apiURL);
  }
}
