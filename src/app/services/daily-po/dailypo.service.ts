import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators/map';
import { Observer } from 'rxjs/Observer';

import { appConfig } from '../../app.config';
// import { GraphProduct } from '../../models';

@Injectable()
export class DailypoService {

  constructor(private http: HttpClient) { }

  getGraphProduct(Date: string, GroupCode: string, Unit: string) {
    const apiURL = `${appConfig.apiUrl}/api/GraphProduct`;
    const params = { Date, GroupCode, Unit };
    return this.http.get<any>(apiURL, { params, observe: 'response' })
  }
}
