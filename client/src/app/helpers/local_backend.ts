import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

import { User, Role } from '../models';
import users from '../../../../iotapi/config/user.json';
/*
const users: User[] = [
  { id: 1, username: 'admin', password: 'admin', role: Role.Admin },
  { id: 2, username: 'user', password: 'user',  role: Role.User },
  { id: 2, username: 'test', password: 'test', role: Role.User }
];
*/
@Injectable()
export class LocalBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        // wrap in delayed observable to simulate server api call
        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize())
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute() {
            switch (true) {
                case url.endsWith('/users/authenticate') && method === 'POST':
                    return authenticate();
                case url.endsWith('/users') && method === 'GET':
                    return getUsers();
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }
        }

        // route functions

        function authenticate() {
            const { username, password } = body;
            const user = users.find(x => x.username === username && x.password === password);
            // tslint:disable-next-line:curly
            if (!user) return error('Username or password is incorrect');
            return ok({
                id: user.id,
                username: user.username,
                role: user.role,
                token: user.id + user.username + user.role
            });
        }

        function getUsers() {
            if (!isLoggedIn()) { return unauthorized(); }
            return ok(users);
        }

        // helper functions

        // tslint:disable-next-line:no-shadowed-variable
        function ok(body?) {
            return of(new HttpResponse({ status: 200, body }));
        }

        function error(message) {
            return throwError({ error: { message } });
        }

        function unauthorized() {
            return throwError({ status: 401, error: { message: 'Unauthorised' } });
        }

        function isLoggedIn() {
            console.log('check', localStorage.getItem('currentUser'));
            return headers.get('Authorization') === 'Bearer ' + currentUser().id + currentUser().username + currentUser().role;
        }

        function currentUser() {
          // tslint:disable-next-line:curly
          if (!isLoggedIn()) return;
          // tslint:disable-next-line:radix
          const id = parseInt(headers.get('Authorization').split('.')[1]);
          return users.find(x => x.id === id);
        }

        function idFromUrl() {
        const urlParts = url.split('/');
        // tslint:disable-next-line: radix
        return parseInt(urlParts[urlParts.length - 1]);
        }
    }
}

export let LocalBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: LocalBackendInterceptor,
    multi: true
};
