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
    this.spiner.show();
    const token = localStorage.getItem('token');

    const jwtToken = token.split('.')[1];
    const decodedJwtJsonToken = window.atob(jwtToken);
    const decodedJwtToken = JSON.parse(decodedJwtJsonToken);
    this.productService.getProductsUser(decodedJwtToken.id).subscribe(
      (AllGames: ProductItem[]) => {

        this.listOfData = AllGames;
        this.listOfSearch = AllGames;
  });

    setTimeout(() => {
      this.spiner.hide();
    }, 2000);
  }

  Search() {
    this.spiner.show();
    this.listOfSearch = this.listOfData.filter(t => t.name.includes(this.searchText) ||
    t.companyName.includes(this.searchText));
      this.spiner.hide();

  }

}
