import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class DeviceService {


  constructor(private http: HttpClient) {   }
 getAllActions()
 {
  return this.http.get<any>(`${environment.cmdUrl}/allactions`);
 }
 getDevicesApi()
 {
  return this.http.get<any>(`${environment.apiUrl}/devices`);
 }

 getByIdApi(id)
 {
  return this.http.get<any>(`${environment.apiUrl}/devices/` + id);
 }
 getbyRoomApi(room)
 {
  return this.http.get<any>(`${environment.apiUrl}/devices/byroom/` + room);
 }

}
