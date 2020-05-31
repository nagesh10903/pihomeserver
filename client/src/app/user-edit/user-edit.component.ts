import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {UsersService} from '../services/users.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  btndelete = false;
  btnclose = true;
  btnsubmit = true;
  userForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  constructor(private apiCall: UsersService,
              private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<UserEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {}
   ngOnInit(): void {
    this.btnsubmit = true;
    if (this.data.mode === 'ADD' ){

     this.btndelete = false;
     this.userForm = this.formBuilder.group({
        username: [ '', Validators.required],
        password: ['', Validators.required],
        role: ['USER'],
        category: ['CAT0']
        });
     }
    else  {

      this.btndelete = true;
      this.userForm = this.formBuilder.group({
      username: [ this.data.user.username, ],
      password: [this.data.user.password, Validators.required],
      role: [ this.data.user.role],
      category: [this.data.user.category]
      });
      this.userForm.get('username').disable();
      if ( !this.data.isAdmin){
        this.userForm.get('password').disable();
        this.userForm.get('role').disable();
        this.userForm.get('category').disable();
        this.btnsubmit = false;
      }

    }
  }
  get f() { return this.userForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.userForm.invalid) {
        return;
    }
    this.loading = true;
    if (this.data.mode === 'ADD' ){ this.doadd(); }
    else if (this.data.mode === 'EDIT' ) {this.doedit(); }
    return false;
}
  onDelete(username)
  {
    this.dodelete(username);
    this.dialogRef.close();
    return false;
  }
  onCancel()
  {
    this.dialogRef.close();
    return false;
  }

  doadd()
  {
    var newuser = { username: this.f.username.value, password: this.f.password.value,
          role: this.f.role.value, category: this.f.category.value};
    this.apiCall.AddUserApi(newuser).subscribe(data => {
      this.dialogRef.close();
    },
    error => {
        this.error = error;
        this.loading = false;
    });
  }

  doedit(){
    var upduser = { username: this.f.username.value, password: this.f.password.value,
      role: this.f.role.value, category: this.f.category.value};
    this.apiCall.UpdateUserApi(upduser).subscribe(data => {
      this.dialogRef.close();
    },
    error => {
        this.error = error;
        this.loading = false;
    });
  }

  dodelete(username){
    this.apiCall.DeleteUserApi(this.f.username.value).subscribe(data => {
      console.log(data);
      this.dialogRef.close();
    },
    error => {
        this.error = error;
        this.loading = false;
    });
  }
}
