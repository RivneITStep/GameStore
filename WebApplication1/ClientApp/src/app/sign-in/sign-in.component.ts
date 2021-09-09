import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { SignInModel } from '../Models/sign-in.model';
import { AuthService } from '../Services/auth.service';
import jwt_decode from "jwt-decode";
import { Router } from '@angular/router';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})

export class SignInComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private notifier: NotifierService,
    private router: Router) { }

  model = new SignInModel();
  decoded: any;
  login() {
    this.spinner.show('mySpinner');
   //this.spinner.show();
    this.notifier.hideAll();

    if (!this.model.isValid()) {
      this.notifier.notify('error', "Please, enter all field for login!");
      this.spinner.hide('mySpinner');
    }
    else if (!this.model.isEmail()) {
      this.notifier.notify('error', "Please, enter correct email!");
      this.spinner.hide('mySpinner');
    }
    else {
      this.authService.SignIn(this.model).subscribe(
        data => {
          console.log(data);
          if (data.status === 200) {
            window.localStorage.setItem('token', data.token);
            this.decoded = jwt_decode(data.token);

            if (this.decoded.roles === "Admin") {
              this.router.navigate(['/admin']);
            }
            else if (this.decoded.roles === "User") {
              this.router.navigate(['/client-panel']);
            }
            else if (this.decoded.roles === "Publisher") {
              this.router.navigate(['/publisher-panel']);
            }
            localStorage.setItem("role", this.decoded.roles);
            this.authService.statusLogin.emit(true);

          }
          else {
            for (var i = 0; i < data.errors.length; i++) {
              this.notifier.notify('error', data.errors[i]);
            }
          }
          setTimeout(() => {
            this.spinner.hide('mySpinner');
          }, 1000);
        }
      )
    }

  }

  ngOnInit() {
  }

}
