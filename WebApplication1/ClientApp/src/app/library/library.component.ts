import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductItem } from '../Models/ProductItem.model';
import { ProductManagerService } from '../Services/product-manager.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {

  constructor(
    private productService: ProductManagerService,
    private spiner: NgxSpinnerService,
    ) { }

    listOfIdGame: number[] = [];
    listOfSearch: ProductItem[] = [];
    searchText: string;

    listOfData: ProductItem[] = [];
    listOfDataUser: ProductItem[] = [];
  ngOnInit() {
    this.spiner.show('mySpinner');
    const token = localStorage.getItem('token');

    const jwtToken = token.split('.')[1];
    const decodedJwtJsonToken = window.atob(jwtToken);
    const decodedJwtToken = JSON.parse(decodedJwtJsonToken);

    console.log(decodedJwtToken.id);

    this.productService.getProductsUser(decodedJwtToken.id).subscribe(
      (AllGames: ProductItem[]) => {

        this.listOfData = AllGames;
        this.listOfSearch = AllGames;
  });

    setTimeout(() => {
      this.spiner.hide('mySpinner');
    }, 2000);
  }

  Search() {
    this.spiner.show('mySpinner');
    this.listOfSearch = this.listOfData.filter(t => t.name.includes(this.searchText) ||
    t.companyName.includes(this.searchText));
      this.spiner.hide('mySpinner');

  }

}
