import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { stringify } from 'querystring';
import { ProductFullItem } from '../Models/product-full-item';
import { ProductItem } from '../Models/ProductItem.model';
import { ProductManagerService } from '../Services/product-manager.service';


interface ItemData {
  id: string;
  name: string;
  age: number;
  address: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {

  constructor(
    private productService: ProductManagerService,
    private spinner: NgxSpinnerService,
    private notifier: NotifierService) { }

  listOfData: ProductItem[] = [];
  listOfSearch: ProductItem[] = [];
  searchText: string;

  product: ProductFullItem;

  array = [0, 1, 2, 3];
  arrayImage = [
    'https://cdn.akamai.steamstatic.com/steam/apps/1517290/header.jpg?t=1628787459',
    'https://cdn.akamai.steamstatic.com/steam/apps/1643320/header.jpg?t=1628240324',
    'https://cdn.akamai.steamstatic.com/steam/apps/1124300/header.jpg?t=1629304781',
    'https://cdn.cloudflare.steamstatic.com/steam/apps/1551360/header.jpg?t=1625262842'
  ];
  arrayName = ['Battlefield™ 2042', 'S.T.A.L.K.E.R. 2', 'HUMANKIND', 'Forza Horizon 5'];
  arrayGenre = [
  'Action, Shooter, Multiplayer, War',
  'Open World, Adwenture, Story Rich, Western',
  'Open World, Adwenture, Story Rich, Western',
  'Open World, Adwenture, Racing'];


  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit() {
    this.spinner.show('mySpinner');
    this.productService.getAllProducts().subscribe(
    (AllUsers: ProductItem[]) => {
    this.listOfData = AllUsers;
    this.listOfSearch = AllUsers;
    this.spinner.hide('mySpinner');
  });
  }

  Search() {
    this.listOfSearch = this.listOfData.filter(t => t.name.includes(this.searchText) ||
    t.companyName.includes(this.searchText));
  }

}

