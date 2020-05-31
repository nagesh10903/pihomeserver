import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { RoomsComponent } from './rooms/rooms.component';
import { UsersComponent } from './users/users.component';
import { DevicesComponent } from './devices/devices.component';
import { LoginComponent } from './login/login.component';
import { LoginLayoutComponent, HomeLayoutComponent } from './layouts';
import { Role } from './models';

import { AuthGuard } from './helpers';


const routes: Routes = [
{ path: '', component: HomeLayoutComponent, canActivate: [AuthGuard] ,
 children: [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: 'home', component: MainComponent  },
    { path: 'user', component: UsersComponent, data: { roles: [Role.Admin]  }},
    { path: 'rooms/:name', component: RoomsComponent  },
    { path: 'devices', component: DevicesComponent, data: { roles: [Role.Admin]  }}
]},
{ path: '', component: LoginLayoutComponent,
 children: [
     { path: 'login', component: LoginComponent }
    ]}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
