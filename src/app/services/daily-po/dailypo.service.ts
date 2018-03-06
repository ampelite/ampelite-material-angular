import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { appConfig } from '../../app.config';

@Injectable()
export class DailypoService {

  constructor(private http: HttpClient) { }

  getAll() {
    let url = `${appConfig.apiLocal}/api/GraphProduct`;
    let params = { Date: '2018-02-28T00:00:00', GroupCode: 'fibre', Unit: '1m' };

    this.http.get<any>(url, { params, observe: 'response' })
      .toPromise()
      .then(response => {
        console.log(JSON.stringify(response));
      })
      .catch(console.log);
  }
}
