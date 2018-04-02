import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observer } from 'rxjs/Observer';

import { appConfig } from '../../app.config';
import { GroupUnit as GroupUnitModel } from '../../models';

@Injectable()
export class GroupUnitService {

  constructor(
    private http: HttpClient
  ) { }

  getAll() {
    const apiURL = `${appConfig.apiUrl}/api/Dailypo/GroupUnits`;
    return this.http.get<any>(apiURL);
  }

  getById(id: string) {
    const apiURL = `${appConfig.apiUrl}/api/Dailypo/GroupUnits`;
    const params = { UnitID: id }
    return this.http.get<any>(apiURL, { params, observe: 'response' });
  }

  getByGroupCode(groupCode: string) {
    const apiURL = `${appConfig.apiUrl}/api/Dailypo/GroupUnits/ByGroupCode`;
    const params = { groupCode: groupCode }
    return this.http.get<any>(apiURL, { params });
  }
}
