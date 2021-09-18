import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SignInModel } from '../Models/sign-in.model';
import { AuthService } from '../Services/auth.service';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})

export class SignInComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private notification: NzNotificationService
    ) { }

  model = new SignInModel();
  decoded: any;
  login() {
    this.spinner.show();

    if (!this.model.isValid()) {
      this.notification.create(
        'warning',
        'Notification Title',
        'Please, enter all field for login!'
      );
      this.spinner.hide();
    } else if (!this.model.isEmail()) {
      this.notification.create(
        'warning',
        'Notification Title',
        'Please, enter correct email!'
      );
      this.spinner.hide();

    } else {
      this.authService.SignIn(this.model).subscribe(
        data => {
          console.log(data);
          if (data.status === 200) {
            window.localStorage.setItem('token', data.token);
            this.decoded = jwt_decode(data.token);

            if (this.decoded.roles === 'Admin') {
              this.router.navigate(['/admin-panel/table']);
            } else if (this.decoded.roles === 'User') {
              this.router.navigate(['/library']);
            }
            localStorage.setItem('role', this.decoded.roles);
            this.authService.statusLogin.emit(true);

          } else {
            for ( let i = 0; i < data.errors.length; i++) {
              this.notification.create(
                'error',
                'Notification Title',
                data.errors[i]
              );
            }
          }
          setTimeout(() => {
            this.spinner.hide();
          }, 1000);
        }
      );
    }

  }


  ngOnInit() {
  }

}
