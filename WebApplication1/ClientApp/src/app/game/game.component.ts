import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiResponse } from '../Models/api.response';
import { CategoriesItem } from '../Models/categories-item.model';
import { LanguageItem } from '../Models/language-item.model';
import { ProductFullItem } from '../Models/product-full-item';
import { SysReqItem } from '../Models/sysreq-item.model';
import { ProductManagerService } from '../Services/product-manager.service';
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  idGame: string;
  product: ProductFullItem;
  sysreqmin: SysReqItem;
  sysreqrec: SysReqItem;

  listOfDataLang: LanguageItem[] = [];
  listOfDataCateg: CategoriesItem[] = [];

  constructor(
    private router: ActivatedRoute,
    private productService: ProductManagerService,
    private spinner: NgxSpinnerService,
    private notifier: NotifierService
    ) { }
    array = [];

    ngOnInit() {
      this.spinner.show('mySpinner');
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

        this.spinner.hide('mySpinner');
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

        this.spinner.hide('mySpinner');
      }



}
