import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})

export class NavMenuComponent implements OnInit {
  isExpanded = false;
  isLogin = false;
  isAdmin = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {

    const token = localStorage.getItem('token');
    if (token != null) {
      this.isLogin = true;
      this.isAdmin = this.authService.isAdmin();
    } else {
      this.isLogin = false;
      this.isAdmin = false;
    }

    this.authService.statusLogin.subscribe(
      (data) => {
        this.isAdmin = this.authService.isAdmin();
        this.isLogin = data;
      }
    );
  }

  Logout() {
    this.authService.Logout();
  }


  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}

