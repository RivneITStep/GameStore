import { ScrollStrategyOptions } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiResponse } from '../Models/api.response';
import { CategoriesItem } from '../Models/categories-item.model';
import { LanguageItem } from '../Models/language-item.model';
import { ProductFullItem } from '../Models/product-full-item';
import { SysReqItem } from '../Models/sysreq-item.model';
import { AuthService } from '../Services/auth.service';
import { ProductManagerService } from '../Services/product-manager.service';
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  isLogin = false;
  isAdmin = false;

  idGame: string;
  product: ProductFullItem;
  sysreqmin: SysReqItem;
  sysreqrec: SysReqItem;

  listOfDataLang: LanguageItem[] = [];
  listOfDataCateg: CategoriesItem[] = [];

  colors = ['Maroon', 'Red', 'DarkOrange', 'GoldenRod', 'OliveDrab', 'ForestGreen' , 'Green' , 'DarkGreen' ];

  constructor(
    private router: ActivatedRoute,
    private productService: ProductManagerService,
    private spinner: NgxSpinnerService,
    private notifier: NotifierService,
    private authService: AuthService
    ) { }
    array = [];

    getColor(num) {
      if ( num > 99) {
        return this.colors[7];
      }
      if ( num > 94) {
        return this.colors[6];
      }
      if ( num > 89) {
        return this.colors[5];
      }
      if ( num > 84) {
        return this.colors[4];
      }
      if ( num > 74) {
        return this.colors[3];
      }
      if ( num > 59) {
        return this.colors[2];
      }
      if ( num > 39) {
        return this.colors[1];
      }
      if ( num > 0) {
        return this.colors[0];
      }
    }

    ngOnInit() {
      this.spinner.show('mySpinner');

      var token = localStorage.getItem('token');
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

      this.router.paramMap.subscribe(params => {
        this.idGame = params.get('id');
        console.log(this.idGame);
        this.productService.getProduct(this.idGame).subscribe(
          (prod: ProductFullItem) => { this.product = prod;    this.array = [
            '../../assets/img' + '/' + this.product.image1,
            '../../assets/img' + '/' + this.product.image2,
            '../../assets/img' + '/' + this.product.image3,
            '../../assets/img' + '/' + this.product.image4];
            console.log(this.product);
          }
          );
        });

          this.productService.getSysReqMin(this.idGame).subscribe(
            (sysreq: SysReqItem) => { this.sysreqmin = sysreq;
              console.log(this.sysreqmin);
            }
          );
          this.productService.getSysReqRec(this.idGame).subscribe(
            (sysreq: SysReqItem) => { this.sysreqrec = sysreq;
              console.log(this.sysreqrec);
            }
          );

          this.productService.getLanguagesGame(this.idGame).subscribe(
            (AllLanguages: LanguageItem[]) => {
            this.listOfDataLang = AllLanguages;
            });

            this.productService.getGanreGame(this.idGame).subscribe(
              (AllGanres: CategoriesItem[]) => {
              this.listOfDataCateg = AllGanres;
              });

              setTimeout(() => {
                this.spinner.hide('mySpinner');
              }, 2000);
      }

      buyProduct() {
        this.spinner.show('mySpinner');
        const token = localStorage.getItem('token');

        const jwtToken = token.split('.')[1];
        const decodedJwtJsonToken = window.atob(jwtToken);
        const decodedJwtToken = JSON.parse(decodedJwtJsonToken);
        const dataId: string[] = [decodedJwtToken.id, this.idGame];
        this.productService.BuyProduct(dataId).subscribe(
          (data: ApiResponse) => {
            if (data.status === 200) {
              this.notifier.notify('success', 'Game removed!');
              this.spinner.hide('mySpinner');
            } else {
              for ( let i = 0; i < data.errors; i++) {
                this.notifier.notify('error', data.errors[i]);
              }
            }
          }
        );

        setTimeout(() => {
          this.spinner.hide('mySpinner');
        }, 2000);
      }



}
