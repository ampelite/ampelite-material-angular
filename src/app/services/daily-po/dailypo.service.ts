import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators/map';
import { Observer } from 'rxjs/Observer';

import { appConfig } from '../../app.config';
// import { GraphProduct } from '../../models';

@Injectable()
export class DailypoService {

  constructor(private http: HttpClient) { }

  getGroupReport() {
    const apiURL = `${appConfig.apiUrl}/api/GroupReport`;
    return this.http.get<any>(apiURL);
  }

  getGroupUnit(GroupCode:string){
    const apiURL = `${appConfig.apiUrl}/api/GroupUnit`;
    const params = {GroupCode}
    return this.http.get<any>(apiURL, {params, observe: 'response'});
  }

  getGraphProduct() {
    const apiURL = `${appConfig.apiUrl}/api/GraphProduct`;
    const params = { Date: '2018-02-28T00:00:00', GroupCode: 'fibre', Unit: '1m' };
    return this.http.get<any>(apiURL, { params, observe: 'response' })
  }
}