import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NgxSpinnerService } from 'ngx-spinner';
import { SignUpModel } from '../Models/sign-up.model';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(
    private spinner: NgxSpinnerService,
    private notification: NzNotificationService,
    private authService: AuthService,
    private router: Router
  ) { }

  model = new SignUpModel();
  confirmPassword: string;

  register() {
    this.spinner.show('mySpinner');

    if (!this.model.isEmail()) {
      this.spinner.hide('mySpinner');
      this.notification.create(
        'warning',
        'Notification Title',
        'Please, enter correct email!'
      );
    } else if (this.model.Password !== this.confirmPassword) {
      this.spinner.hide('mySpinner');
      this.notification.create(
        'warning',
        'Notification Title',
        'Password dont match!'
      );
    } else if (this.model.isValid()) {
      this.authService.SignUp(this.model).subscribe(
        data => {
          if (data.status === 200) {
            this.notification.create(
              'success',
              'Notification Title',
              'You seccess registered in system!'
            );
            this.router.navigate(['/sign-in']);
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
            this.spinner.hide('mySpinner');
          }, 1000);

        }
      );
    } else {
      this.spinner.hide('mySpinner');
      this.notification.create(
        'error',
        'Notification Title',
        'Please, enter all fieald for register!'
      );
    }
  }

  ngOnInit() {
  }

}
