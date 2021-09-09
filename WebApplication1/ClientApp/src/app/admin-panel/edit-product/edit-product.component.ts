import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiResponse } from 'src/app/Models/api.response';
import { CategoriesItem } from 'src/app/Models/categories-item.model';
import { LanguageItem } from 'src/app/Models/language-item.model';
import { ProductAdd } from 'src/app/Models/product-add.model';
import { ProductEdit } from 'src/app/Models/product-edit.model';
import { ProductFullItem } from 'src/app/Models/product-full-item';
import { SysReqAdd } from 'src/app/Models/sysreq-add.model';
import { SysReqItem } from 'src/app/Models/sysreq-item.model';
import { ProductManagerService } from 'src/app/Services/product-manager.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  constructor(
    private productService: ProductManagerService,
    private notifier: NotifierService,
    private spiner: NgxSpinnerService,
    private router: ActivatedRoute
    ) { }
    idGame: string;
    listOfDataLangedit: LanguageItem[] = [];
    listOfDataCategedit: CategoriesItem[] = [];
    array = [];
    selectedCategies: number[] = [];
    selectedLanguages: number[] = [];

    imageBlobHead: File;
    imageBlob1: File;
    imageBlob2: File;
    imageBlob3: File;
    imageBlob4: File;
    isError: boolean;

    game: ProductFullItem;
    sysreqmin: SysReqItem;
    sysreqrec: SysReqItem;


    listOfDataCategGame: CategoriesItem[] = [];
    listOfDataLangGame: LanguageItem[] = [];
    listOfDataLang: LanguageItem[] = [];
    listOfDataCateg: CategoriesItem[] = [];

    modelSysReqEdit = new SysReqAdd;
    modelSysMinEdit = new SysReqAdd;
    modelEdit = new ProductEdit;

    setImage(file: FileList) {
      this.imageBlobHead = file.item(0);
      console.log(file.item(0));
      console.log(this.imageBlobHead);
    }

    setImage1(file: FileList) {
      this.imageBlob1 = file.item(0);
      console.log(file);
      console.log(this.imageBlob1);
    }

    setImage2(file: FileList) {
      this.imageBlob2 = file.item(0);
      console.log(file);
      console.log(this.imageBlob2);
    }

    setImage3(file: FileList) {
      this.imageBlob3 = file.item(0);
      console.log(file);
      console.log(this.imageBlob3);
    }

    setImage4(file: FileList) {
      this.imageBlob4 = file.item(0);
      console.log(file);
      console.log(this.imageBlob4);
    }


    ngOnInit() {
      this.isError = false;
      this.spiner.show('mySpinner');
      this.router.paramMap.subscribe(params => {
        this.idGame = params.get('id');
        console.log(this.idGame);
        this.productService.getProduct(this.idGame).subscribe(
          (prod: ProductFullItem) => { this.game = prod;    this.array = [
            '../../assets/img' + '/' + this.game.image1,
            '../../assets/img' + '/' + this.game.image2,
            '../../assets/img' + '/' + this.game.image3,
            '../../assets/img' + '/' + this.game.image4];
            console.log(this.game);
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
            this.listOfDataLangGame = AllLanguages;
            });

            this.productService.getGanreGame(this.idGame).subscribe(
              (AllGanres: CategoriesItem[]) => {
              this.listOfDataCategGame = AllGanres;
              });

              this.isError = false;
              this.spiner.show('mySpinner');
              this.productService.getAllLanguages().subscribe(
                (AllLanguages: LanguageItem[]) => {
                this.listOfDataLang = AllLanguages;
                });
              this.productService.getAllCategories().subscribe(
                (AllCategories: CategoriesItem[]) => {
                this.listOfDataCateg = AllCategories;
                this.spiner.hide('mySpinner');
                });

        this.spiner.hide('mySpinner');

    }

    onSubmit() {
      this.modelEdit.id = this.idGame;
      console.log(this.modelEdit);

      this.spiner.show('mySpinner');
      this.productService.editProduct(this.modelEdit).subscribe(
        (data: ApiResponse) => {
          if (data.status === 200) {
            this.notifier.notify('success', 'Game removed!');
            this.spiner.hide('mySpinner');
          } else {
            for ( let i = 0; i < data.errors; i++) {
              this.notifier.notify('error', data.errors[i]);
            }
          }
        }
      );


    }

}
