import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

//import { ModalModule } from './modal';
import { IrremoteComponent } from './irremote/irremote.component';
import { CameraComponent } from './camera/camera.component';
import { MaterialModule } from './material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainComponent } from './main/main.component';

import { ServicesModule } from './services/services.module';
import { RoomsComponent } from './rooms/rooms.component';
import { UsersComponent } from './users/users.component';
import { DevicesComponent } from './devices/devices.component';
import { LoginComponent } from './login/login.component';

import { JwtInterceptor, ErrorInterceptor, LocalBackendProvider } from './helpers';
import { HomeLayoutComponent, LoginLayoutComponent } from './layouts';
import { ViewRoomComponent } from './view-room/view-room.component';
import { SafePipePipe } from './safe-pipe.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserEditComponent } from './user-edit/user-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    RoomsComponent,
    UsersComponent,
    DevicesComponent,
    LoginComponent,
    HomeLayoutComponent,
    LoginLayoutComponent,
    ViewRoomComponent,
    SafePipePipe,
    IrremoteComponent,
    CameraComponent,
    UserEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServicesModule,
    ReactiveFormsModule,
    HttpClientModule,
   //  ModalModule,
    BrowserAnimationsModule,
      MaterialModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    // LocalBackendProvider
  ],
  bootstrap: [AppComponent],
  entryComponents: [IrremoteComponent, CameraComponent]
})
export class AppModule { }
