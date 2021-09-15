import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  idGame: number;
  constructor(
    private spiner: NgxSpinnerService
    ) { }

  ngOnInit() {

    this.spiner.show('mySpinner');
    setTimeout(() => {
    this.spiner.hide('mySpinner');
  }, 3000);
  }

}
