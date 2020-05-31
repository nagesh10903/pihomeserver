import { Component, OnInit } from '@angular/core';
import {DeviceService} from '../services/device.service';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {

  devices: any = [];
  constructor( private usrService: DeviceService) {

     this.usrService.getDevicesApi().subscribe( data => {
      this.devices = data.devices;
     });
   }

  ngOnInit(): void {
  }


}
