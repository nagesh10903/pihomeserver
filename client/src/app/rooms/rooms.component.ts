import { RoomsService } from './../services';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit  {
  rooms  = [];
  roomdevices = [];
  name = 'ALL';
 // tslint:disable-next-line: variable-name
 constructor( private roomServ: RoomsService , private _Activatedroute: ActivatedRoute ){}
  ngOnInit(): void {
    this._Activatedroute.paramMap.subscribe(params => {
      this.name = params.get('name');
      if ( !this.name ){this.name = 'ALL'; }
  });
    this.roomServ.getAllActions().subscribe((data) => {
     // console.log(data);
      this.roomdevices = data; // Get list of all controlers and devices for all the rooms.
      // Get the List of rooms in rooms array
      this.rooms = data.devices.reduce((a, d) => {
        if (a.indexOf(d.device.room) === -1) {
          a.push(d.device.room);
        }
        return a;
       }, []);
    });
  }
}
