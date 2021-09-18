import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiResponse } from '../Models/api.response';
import { CategoriesItem } from '../Models/categories-item.model';
import { LanguageItem } from '../Models/language-item.model';
import { ProductFullItem } from '../Models/product-full-item';
import { ProductItem } from '../Models/ProductItem.model';
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
  isBuy = false;
  idGame: string;
  product: ProductFullItem;
  sysreqmin: SysReqItem;
  sysreqrec: SysReqItem;

  listOfDataUser: ProductItem[] = [];
  listOfDataLang: LanguageItem[] = [];
  listOfDataCateg: CategoriesItem[] = [];

  colors = ['Maroon', 'Red', 'DarkOrange', 'GoldenRod', 'OliveDrab', 'ForestGreen' , 'Green' , 'DarkGreen' ];

  constructor(
    private arouter: ActivatedRoute,
    private productService: ProductManagerService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private notification: NzNotificationService,
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
      this.spinner.show();

      // tslint:disable-next-line:prefer-const
      let token = localStorage.getItem('token');
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

      this.arouter.paramMap.subscribe(params => {
        this.idGame = params.get('id');
        this.productService.getProduct(this.idGame).subscribe(
          (prod: ProductFullItem) => { this.product = prod;    this.array = [
            '../../assets/img' + '/' + this.product.image1,
            '../../assets/img' + '/' + this.product.image2,
            '../../assets/img' + '/' + this.product.image3,
            '../../assets/img' + '/' + this.product.image4];
          }
          );
        });

      this.productService.getSysReqMin(this.idGame).subscribe(
        (sysreq: SysReqItem) => { this.sysreqmin = sysreq;
        }
      );
      this.productService.getSysReqRec(this.idGame).subscribe(
        (sysreq: SysReqItem) => { this.sysreqrec = sysreq;
        }
      );

      this.productService.getLanguagesGame(this.idGame).subscribe(
        (AllLanguages: LanguageItem[]) => {
          this.listOfDataLang = AllLanguages;
        });

        if (token != null) {
          this.productService.getGanreGame(this.idGame).subscribe(
            (AllGanres: CategoriesItem[]) => {
              this.listOfDataCateg = AllGanres;
            });

            const jwtToken = token.split('.')[1];
            const decodedJwtJsonToken = window.atob(jwtToken);
            const decodedJwtToken = JSON.parse(decodedJwtJsonToken);
            this.productService.getProductsUser(decodedJwtToken.id).subscribe(
              (AllGames: ProductItem[]) => {
                this.listOfDataUser = AllGames;
                for ( let i = 0; i < this.listOfDataUser.length ; i++) {
                  // tslint:disable-next-line:radix
                  if ( this.listOfDataUser[i].id === Number(this.idGame)) {
                    this.isBuy = true;
                  }
                }
              }); }

              this.spinner.hide();

      }

      buyProduct() {
        this.spinner.show();
        const token = localStorage.getItem('token');

        const jwtToken = token.split('.')[1];
        const decodedJwtJsonToken = window.atob(jwtToken);
        const decodedJwtToken = JSON.parse(decodedJwtJsonToken);
        const dataId: string[] = [decodedJwtToken.id, this.idGame];
        this.productService.BuyProduct(dataId).subscribe(
          (data: ApiResponse) => {
            if (data.status === 200) {
              this.router.navigate(['/library']);
              this.notification.create(
                'success',
                'Notification Title',
                'You seccess buy game!'
              );
              this.spinner.hide();
            } else {
              for ( let i = 0; i < data.errors; i++) {
                this.notification.create(
                  'error',
                  'Notification Title',
                  data.errors[i]
                );
              }
            }
          }
        );

        setTimeout(() => {
          this.spinner.hide();
        }, 2000);
      }



}
