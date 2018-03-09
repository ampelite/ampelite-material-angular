import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators/map';
import { Observer } from 'rxjs/Observer';

import { appConfig } from '../../app.config';
// import { GraphProduct } from '../../models';

@Injectable()
export class DailypoService {

  constructor(private http: HttpClient) { }

  getAll() {
    let apiURL = `${appConfig.apiUrl}/api/GraphProduct`;
    let params = { Date: '2018-02-28T00:00:00', GroupCode: 'fibre', Unit: '1m' };
    return this.http.get<any>(apiURL, { params, observe: 'response' })
  }
}
