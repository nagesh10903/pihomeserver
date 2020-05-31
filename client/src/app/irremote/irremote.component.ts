import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ApicallService} from '../services';


@Component({
  selector: 'app-irremote',
  templateUrl: './irremote.component.html',
  styleUrls: ['./irremote.component.css']
})
export class IrremoteComponent implements OnInit {

  constructor(private apiCall: ApicallService,
    public dialogRef: MatDialogRef<IrremoteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

    onNoClick(): void {
      this.dialogRef.close();
    }

  ngOnInit(): void {
  }
  doircmd(cmdRoute)
  {
    this.apiCall.getCmd(cmdRoute).subscribe(data => {
      // console.log(data, 'Remote cmd');
       return data;
     });
    return false;
  }
}
