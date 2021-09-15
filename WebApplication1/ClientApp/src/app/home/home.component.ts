import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { stringify } from 'querystring';
import { CategoriesItem } from '../Models/categories-item.model';
import { ProductFullItem } from '../Models/product-full-item';
import { ProductItem } from '../Models/ProductItem.model';
import { AuthService } from '../Services/auth.service';
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

export class HomeComponent implements OnInit {

  constructor(
    private productService: ProductManagerService,
    private spiner: NgxSpinnerService,
    private notifier: NotifierService,
    private authService: AuthService) { }

  listOfData: ProductItem[] = [];
  listOfNews: ProductItem[] = [];
  listOfPopular: ProductItem[] = [];
  listOfSearch: ProductItem[] = [];
  searchText: string;

  isLogin = false;
  isAdmin = false;

  product: ProductFullItem;

  arrayGenre: CategoriesItem[] = [];


  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit() {

    this.spiner.show('mySpinner');

    this.productService.getAllProducts().subscribe(
    (AllGames: ProductItem[]) => {
    this.listOfData = AllGames;
    this.listOfSearch = AllGames;
    });
    this.productService.getNews().subscribe(
    (AllNews: ProductItem[]) => {
    this.listOfNews = AllNews;
    });
    this.productService.getPopular().subscribe(
      (AllPopular: ProductItem[]) => {
      this.listOfPopular = AllPopular;
    });

    setTimeout(() => {
    this.spiner.hide('mySpinner');
  }, 3000);
  }

  Search() {
    this.spiner.show('mySpinner');
    this.listOfSearch = this.listOfData.filter(t => t.name.includes(this.searchText) ||
    t.companyName.includes(this.searchText));
      this.spiner.hide('mySpinner');

  }

}

