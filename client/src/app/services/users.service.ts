import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {


  constructor(private http: HttpClient) {   }
 getUsersApi()
 {
  return this.http.get<any>(`${environment.apiUrl}/users`);
 }

 getUserNameApi(username: string)
 {
  return this.http.get<any>(`${environment.apiUrl}/users/login/` + username);
 }
 getUserApi(id: string)
 {
  return this.http.get<any>(`${environment.apiUrl}/users/` + id);
 }

 AddUserApi(user: any)
 {
   return this.http.post<any>(`${environment.apiUrl}/users/add`, user);
 }

 UpdateUserApi(user: any)
 {
  return this.http.post<any>(`${environment.apiUrl}/users/update/` + user.username, user);
 }
 DeleteUserApi(username: any)
 {
  return this.http.post<any>(`${environment.apiUrl}/users/del/` + username, {username });
 }
}
