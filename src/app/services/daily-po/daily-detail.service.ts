import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { appConfig } from '../../app.config';
import { Observer } from 'rxjs/Observer';

@Injectable()
export class DailyDetailService {

  constructor(private http: HttpClient) { }

  getDetailDaily(groupCode:string, teamName: string, sDate: string){
    const apiURL = `${appConfig.apiUrl}/api/Dailypo/DetailDaily`;
    const params = { groupCode, teamName, sDate };
    return this.http.get<any>(apiURL, { params, observe: 'response' })
  }

}
