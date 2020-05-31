import { UserEditComponent } from './../user-edit/user-edit.component';
import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit, Input, Output , OnChanges } from '@angular/core';
import {UsersService} from '../services/users.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
 users: any = [];
 loggeduser: any ;
  constructor( private usrService: UsersService, private aurthUserService: AuthenticationService,
               public dialog: MatDialog ) {
     this.refreshUsers();
     this.loggeduser = aurthUserService.currentUserValue;
    // console.log(this.loggeduser);
   }

  ngOnInit(): void {
  }
  onUserAdd()
  {
    const dialogRef = this.dialog.open(UserEditComponent, {
    //  width: '350px',
      data: {mode: 'ADD' }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.refreshUsers();
    });
    return false;
  }

  onUserView(username)
  {
    this.usrService.getUserNameApi(username).subscribe(data => {
      const dialogRef = this.dialog.open(UserEditComponent, {
       // width: '350px',
        data: { mode: 'EDIT', user: data.users, isAdmin: this.isAdmin() }
      });

      dialogRef.afterClosed().subscribe(result => {
        this.refreshUsers();
      });
    });
    return false;
  }

 refreshUsers()
   {
    this.usrService.getUsersApi().subscribe(data => {
      this.users = data.users;
     });
   }
  isAdmin()
  {
   return (this.loggeduser.role.toUpperCase() === 'ADMIN') ? true : false;
  }
}
