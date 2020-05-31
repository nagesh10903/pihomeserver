import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ApicallService {

  constructor(private http: HttpClient) { }
// action Api  :room/:dev/:option?
  getApi(route)
 {
  return this.http.get<any>(`${environment.apiUrl}/` + route);
 }

 getCmd(route)
 {
  // console.log(`${environment.cmdUrl}/` + route);
   return this.http.get<any>(`${environment.cmdUrl}/` + route);
 }

 postApi(route, data)
 {
  return this.http.post<any>(`${environment.apiUrl}/` + route, data);
 }
}
