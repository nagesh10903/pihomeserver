import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IrremoteComponent } from '../irremote/irremote.component';
import { CameraComponent } from '../camera/camera.component';



@NgModule({
  declarations: [IrremoteComponent, CameraComponent],
  imports: [
    CommonModule
  ]
})
export class ModalModule { }
