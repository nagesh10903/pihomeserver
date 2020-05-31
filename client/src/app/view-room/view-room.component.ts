import { Component, OnInit, Input, Output , OnChanges } from '@angular/core';
import { environment } from '../../environments';
import {ApicallService} from '../services';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {IrremoteComponent} from '../irremote/irremote.component';
import {CameraComponent} from '../camera/camera.component';


@Component({
  selector: 'app-view-room',
  templateUrl: './view-room.component.html',
  styleUrls: ['./view-room.component.css']
})
export class ViewRoomComponent implements OnInit, OnChanges {
  // tslint:disable-next-line: no-input-rename
  @Input('roomdevices') roomdevices: any[];
  // tslint:disable-next-line: no-input-rename
  @Input('room') room;
  devices = [];
  controls = [];
  remote = [];
  ipcamera = [];
  cameraSeleted = false;
  cameraUrl = '' ;
  // tslint:disable-next-line:no-input-rename
  urlControls = 'http://192.168.0.111:3000'; // environment.apiUrl;
  @Output('ircommands') ircommands: any;



  constructor(private apicall: ApicallService, public dialog: MatDialog)
              { }

  ngOnInit(): void {
  }
  ngOnChanges(changes) {
    // tslint:disable-next-line:no-string-literal
    if (changes['room'] && this.room) {
      this.devices = this.roomdevices['devices'].filter( r => r.device.room === this.room );
      this.controls = this.devices.filter(d => d.device.mode === 'CONTROLER');
      this.remote = this.devices.filter(d => d.device.mode === 'IRREMOTE');
      this.ipcamera = this.devices.filter(d => d.device.mode === 'IPCAMERA');
     // console.log(this.ipcamera);
    }
  }
  toggelCamera(event)
  {

    // console.log(this.ipcamera);
    const dialogRef = this.dialog.open(CameraComponent, {
      width: '350px',
      data: {room: this.ipcamera[0].device.room, name: this.ipcamera[0].device.devicename ,
        cameraUrl: this.checkintrnet(this.ipcamera[0].device.label)}
        });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(result);
    });

    return false;
  }
  actionroute(route)
  {
    // tslint:disable-next-line: prefer-const
    let status = this.callCmd(route);

    return false;
  }
  showremote(route)
  {

    this.apicall.getCmd(route).subscribe(data => {
    const dialogRef = this.dialog.open(IrremoteComponent, {
      width: '200px',
      data: {remote: data.ircommands.remote, cmdurl: route, commands: data.ircommands.commands}
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(result);
    });
  });
    return false;
  }

  callApi(route)
  {
    this.apicall.getApi(route).subscribe(data => {
    //  console.log(data);
    this.ircommands = data.ircommands;
    return data;
    });
  }


  callCmd(route): any
  {
    this.apicall.getCmd(route).subscribe(data => {
     // console.log(data,"Call cmd");
      return data;
    });
  }

checkintrnet(label)
{
  const hostname = window.location.hostname;
  let status = 'http://' + hostname + ':' + label.EXT_PORT ;
  if ( hostname.toLowerCase() === 'localhost' || hostname.includes(environment.intranetIP)  )
  {status =  'http://' + label.WIFI; }
  //console.log(status);
  return status;
}

}
