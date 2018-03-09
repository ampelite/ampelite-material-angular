import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observer } from 'rxjs/Observer';

import { appConfig } from '../../app.config';

@Injectable()
export class GroupUnitService {

  constructor(private http: HttpClient) { }

  getAll() {
    const apiURL = `${appConfig.apiUrl}/api/DailypoGroupUnits`;
    return this.http.get<any>(apiURL);
  }

  getById(id: string) {
    const apiURL = `${appConfig.apiUrl}/api/DailypoGroupUnits`;
    const params = { UnitID: id }
    return this.http.get<any>(apiURL, { params, observe: 'response' });
  }

  getByGroupCode(groupCode: string) {
    const apiURL = `${appConfig.apiUrl}/api/DailypoGroupUnits/byGroupCode`;
    const params = { groupCode }
    return this.http.get<any>(apiURL, { params, observe: 'response' });
  }
}
