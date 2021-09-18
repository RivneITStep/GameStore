import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { stringify } from 'querystring';
import { CategoriesItem } from '../Models/categories-item.model';
import { ProductFullItem } from '../Models/product-full-item';
import { ProductItem } from '../Models/ProductItem.model';
import { AuthService } from '../Services/auth.service';
import { ProductManagerService } from '../Services/product-manager.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  constructor(
    private productService: ProductManagerService,
    private spiner: NgxSpinnerService
    ) { }

  listOfData: ProductItem[] = [];
  listOfNews: ProductItem[] = [];
  listOfPopular: ProductItem[] = [];
  listOfSearch: ProductItem[] = [];
  searchText: string;

  ngOnInit() {

    this.spiner.show();
    this.StartSite();
    setTimeout(() => {
      this.spiner.hide();
    }, 3000);

  }

  StartSite() {
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

  }


  Search() {
    this.spiner.show();
    this.listOfSearch = this.listOfData.filter(t => t.name.includes(this.searchText) ||
    t.companyName.includes(this.searchText));
      this.spiner.hide();

  }

}

