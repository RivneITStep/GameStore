import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {

  constructor() { }


  ngOnInit() {
    const token = localStorage.getItem('token');

    const jwtToken = token.split('.')[1];
    const decodedJwtJsonToken = window.atob(jwtToken);
    const decodedJwtToken = JSON.parse(decodedJwtJsonToken);

    console.log(decodedJwtToken.id);

  }

}
