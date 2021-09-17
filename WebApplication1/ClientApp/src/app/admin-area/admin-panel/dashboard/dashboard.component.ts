import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { ChartOptions } from 'chart.js';
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
    CountUser: number;
    CountGames: number;
    Ganres: CategoriesPopular[] = [];
    Games: ProductSales[] = [];
    public pieChartOptions: ChartOptions = {
      responsive: true,
      legend: {
        position: 'left',
      },
      plugins: {
        datalabels: {
          formatter: (value, ctx) => {
            const label = ctx.chart.data.labels[ctx.dataIndex];
            return label;
          },
        },
      }
    };
    public pieChartLabels: string[] = [];
    public pieChartData: number[] = [];
    public pieChartColors = [
      {
        backgroundColor: [
          'rgba(119, 25, 207, 0.8)', 'rgba(142, 69, 209, 0.8)',
          'rgba(164, 113, 212, 0.8)', 'rgba(111, 69, 150, 0.8)',
          'rgba(96, 70, 121, 0.8)', 'rgba(59, 38, 78, 0.8)',
          'rgba(211, 182, 236, 0.8)', 'rgba(42, 0, 78, 0.8)',
          'rgba(97, 32, 155, 0.8)', 'rgba(96, 0, 121, 0.8)',
          'rgba(164, 32, 212, 0.8)', 'rgba(119, 0, 207, 0.8)',
          'rgba(59, 38, 155, 0.8)', 'rgba(70, 36, 100, 0.8)',
          'rgba(126, 78, 138, 0.8)', 'rgba(116, 3, 145, 0.8)']
      },
    ];
    pieChartType = 'pie';

    public chartType = 'horizontalBar';

  public chartDatasets: Array<any> = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'My First dataset' }
  ];

  public chartLabels: Array<any> = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'];

  public chartColors: Array<any> = [
    {
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 2,
    }
  ];

  public chartOptions: any = {
    responsive: true
  };

  // events
    public chartClicked(e: any): void {
      console.log(e);
    }

    public chartHovered(e: any): void {
      console.log(e);
    }

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
        this.pieChartLabels = [
          this.Ganres[0].name,       this.Ganres[1].name,
          this.Ganres[2].name,       this.Ganres[3].name,
          this.Ganres[4].name,       this.Ganres[5].name,
          this.Ganres[6].name,       this.Ganres[7].name,
          this.Ganres[8].name,       this.Ganres[9].name,
          this.Ganres[10].name,       this.Ganres[11].name,
          this.Ganres[12].name,       this.Ganres[13].name,
          this.Ganres[14].name,       this.Ganres[15].name,
        ];
        this.pieChartData = [
          this.Ganres[0].games,       this.Ganres[1].games,
          this.Ganres[2].games,       this.Ganres[3].games,
          this.Ganres[4].games,       this.Ganres[5].games,
          this.Ganres[6].games,       this.Ganres[7].games,
          this.Ganres[8].games,       this.Ganres[9].games,
          this.Ganres[10].games,       this.Ganres[11].games,
          this.Ganres[12].games,       this.Ganres[13].games,
          this.Ganres[14].games,       this.Ganres[15].games,
        ];
      }
    );

    this.productService.getPopularGameForAdmin().subscribe(
      (games: ProductSales[]) => {
        this.Games = games;
        console.log('this.Games');
        console.log(this.Games);
      }
    );

    this.productService.getCountUserForAdmin().subscribe(
      (count: number) => {
        this.CountUser = count;
        console.log('this.CountUser');
        console.log(this.CountUser);
      }
    );

    this.productService.getCountGameForAdmin().subscribe(
      (count: number) => {
        this.CountGames = count;
        console.log('this.CountGames');
        console.log(this.CountGames);
      }
    );


    setTimeout(() => {
      this.spinner.hide('mySpinner');
    }, 4000);

}
}
