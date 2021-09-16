import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { CategoriesPopular } from 'src/app/Models/categories-popular.model';
import { ProductSales } from 'src/app/Models/product-sales.model';
import { ProductManagerService } from 'src/app/Services/product-manager.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private productService: ProductManagerService,
    private spinner: NgxSpinnerService,
    private notifier: NotifierService,
    ) { }

    AveragePrice: number;
    HighestPrice: number;
    LowestPrice: number;
    Price: number;
    Count: number;
    Ganres: CategoriesPopular[] = [];
    Games: ProductSales[] = [];

  ngOnInit() {
    this.spinner.show('mySpinner');

    this.productService.getAveragePriceForAdmin().subscribe(
      (price: number) => {
      this.AveragePrice = price;
      console.log('this.AveragePrice');
      console.log(this.AveragePrice);
    });
    this.productService.getHighestPriceForAdmin().subscribe(
      (price: number) => {
      this.HighestPrice = price;
      console.log('this.HighestPrice');
      console.log(this.HighestPrice);
    });
    this.productService.getLowestPriceForAdmin().subscribe(
      (price: number) => {
      this.LowestPrice = price;
      console.log('this.LowestPrice');
      console.log(this.LowestPrice);
    });
    this.productService.getCountSalesPriceForAdmin().subscribe(
      (count: number) => {
      this.Count = count;
      console.log('this.Count');
      console.log(this.Count);
    });
    this.productService.getSalesPriceForAdmin().subscribe(
      (price: number) => {
      this.Price = price;
      console.log('this.Price');
      console.log(this.Price);
    });

    this.productService.getPopularGanreForAdmin().subscribe(
      (ganres: CategoriesPopular[]) => {
        this.Ganres = ganres;
        console.log('this.Ganres');
        console.log(this.Ganres);
      }
    );

    this.productService.getPopularGameForAdmin().subscribe(
      (games: ProductSales[]) => {
        this.Games = games;
        console.log('this.Games');
        console.log(this.Games);
      }
    );

    this.spinner.hide('mySpinner');
  }
}

