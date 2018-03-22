import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UserService } from '../../../core/services/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _route: Router,
    private _usersService: UserService) { }

  public formBuilder = new FormBuilder();
  public loginForm: FormGroup = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(6)]],
    password: ['', [Validators.required]]
  });
  ngOnInit() {
  }

  public async submitLogin(form: any): Promise<any> {
    if (this.loginForm.valid) {
      const username = this.loginForm.get('username').value;
      const password = this.loginForm.get('password').value;


      this._usersService.login(username, password)
        .then((user) => {
          console.log(user);
          this._route.navigate(['dashboard']);
        })
        .catch((error) => {
          console.log(error);
        });

    } else {
      Object.keys(this.loginForm.controls).forEach((field) => {
        const control = this.loginForm.get(field);

        control.markAsTouched({ onlySelf: true });
      });

      this.loginForm.updateValueAndValidity({ onlySelf: true, emitEvent: true });
    }
  }

}
