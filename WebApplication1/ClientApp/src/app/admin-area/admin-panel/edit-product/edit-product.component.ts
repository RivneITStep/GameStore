import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiResponse } from 'src/app/Models/api.response';
import { CategoriesItem } from 'src/app/Models/categories-item.model';
import { CategoriesItemGame } from 'src/app/Models/categories-item.model copy';
import { LanguageItemGame } from 'src/app/Models/language-item-game.model copy';
import { LanguageItem } from 'src/app/Models/language-item.model';
import { ProductAdd } from 'src/app/Models/product-add.model';
import { ProductEdit } from 'src/app/Models/product-edit.model';
import { ProductFullItem } from 'src/app/Models/product-full-item';
import { SysReqAdd } from 'src/app/Models/sysreq-add.model';
import { SysReqEdit } from 'src/app/Models/sysreq-edit.model';
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

    selectedLang: number[] = [];
    selectedCateg: number[] = [];

    imageBlobHead: File;
    imageBlob1: File;
    imageBlob2: File;
    imageBlob3: File;
    imageBlob4: File;
    isError: boolean;

    color: ThemePalette = 'primary';
    game: ProductFullItem;
    sysreqmin: SysReqItem;
    sysreqrec: SysReqItem;

    checked = true;

    listOfDataCategGame: CategoriesItemGame[] = [];
    listOfDataLangGame: LanguageItemGame[] = [];
    listOfDataLang: LanguageItem[] = [];
    listOfDataCateg: CategoriesItem[] = [];

    modelSysReqEdit = new SysReqEdit;
    modelSysMinEdit = new SysReqEdit;
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

    setCategory(id: number) {
      for (let i = 0; i < this.listOfDataCateg.length; i++) {
        if (this.listOfDataCateg[i].idCategory === id) {
          if (this.listOfDataCateg[i].isChecked === true) {
            this.listOfDataCateg[i].isChecked = false;
          } else {
            this.listOfDataCateg[i].isChecked = true;
          }
          console.log(this.listOfDataCateg[i]);
          break;
        }
      }      for (let i = 0; i < this.listOfDataLang.length; i++) {
        console.log(this.listOfDataCateg[i]);


      }
    }



    setLanguage(id: number) {
      for (let i = 0; i < this.listOfDataLang.length; i++) {
        if (this.listOfDataLang[i].idLanguage === id) {
          if (this.listOfDataLang[i].isChecked === true) {
            this.listOfDataLang[i].isChecked = false;
          } else {
            this.listOfDataLang[i].isChecked = true;
          }
          console.log(this.listOfDataLang[i]);
          break;
        }
      }
      for (let i = 0; i < this.listOfDataLang.length; i++) {
        console.log(this.listOfDataLang[i]);


      }


    }


    ngOnInit() {
      this.isError = false;
      this.spiner.show('mySpinner');
      this.router.paramMap.subscribe(params => {
        this.idGame = params.get('id');
        console.log(this.idGame);
        this.productService.getLanguagesGame(this.idGame).subscribe(
          (AllLanguages: LanguageItemGame[]) => {
          this.listOfDataLangGame = AllLanguages;
          console.log(AllLanguages);
          for (let i = 0; i < this.listOfDataLang.length; i++) {
          for (let j = 0; j < this.listOfDataLangGame.length; j++) {
            if (this.listOfDataLang[i].idLanguage ===  this.listOfDataLangGame[j].idLanguage) {
                this.listOfDataLang[i].isChecked = true;
                break;
              }

            }}

            console.log(this.listOfDataLang);

          });

          this.productService.getGanreGame(this.idGame).subscribe(
            (AllGanres: CategoriesItemGame[]) => {
            this.listOfDataCategGame = AllGanres;
            console.log(AllGanres);


          for (let i = 0; i < this.listOfDataCateg.length; i++) {
            for (let j = 0; j < this.listOfDataCategGame.length; j++) {
              if (this.listOfDataCateg[i].idCategory ===  this.listOfDataCategGame[j].idCategory) {
                  this.listOfDataCateg[i].isChecked = true;
                  break;
                }

              }}
              console.log(this.listOfDataCateg);

            });
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
          this.productService.getAllLanguages().subscribe(
            (AllLanguages: LanguageItem[]) => {
            this.listOfDataLang = AllLanguages;
            });
          this.productService.getAllCategories().subscribe(
            (AllCategories: CategoriesItem[]) => {
            this.listOfDataCateg = AllCategories;
            this.spiner.hide('mySpinner');
            });


              this.isError = false;
              this.spiner.show('mySpinner');




        this.spiner.hide('mySpinner');

    }

    onSubmit() {

      for ( let i = 0; i < this.listOfDataLang.length ; i++) {
        if ( this.listOfDataLang[i].isChecked === true ) {
          this.selectedLang.push(this.listOfDataLang[i].idLanguage);
        }
      }
      for ( let i = 0; i < this.listOfDataCateg.length ; i++) {
        if ( this.listOfDataCateg[i].isChecked === true ) {
          this.selectedCateg.push(this.listOfDataCateg[i].idCategory);
        }
      }

      this.modelEdit.id = this.idGame;
      if (this.modelEdit.data === null) {
          this.modelEdit.data = this.game.data;
      }
      if (this.modelEdit.description === null) {
        this.modelEdit.description = this.game.description;
      }
      if (this.modelEdit.developer === null) {
      this.modelEdit.developer = this.game.developer;
      }
      if (this.modelEdit.evaluation === null) {
        this.modelEdit.evaluation = this.game.evaluation;
      }
      if (this.modelEdit.name === null) {
      this.modelEdit.name = this.game.name;
      }
      if (this.modelEdit.price === null) {
      this.modelEdit.price = this.game.price;
      }
      if (this.modelEdit.publisher === null) {
        this.modelEdit.publisher = this.game.publisher;
      }

      this.modelSysReqEdit.id = this.idGame;
      if (this.modelSysReqEdit.graphics === null) {
        this.modelSysReqEdit.graphics = this.sysreqrec.graphics;
      }
      if (this.modelSysReqEdit.memory === null) {
        this.modelSysReqEdit.memory = this.sysreqrec.memory;
      }
      if (this.modelSysReqEdit.os === null) {
        this.modelSysReqEdit.os = this.sysreqrec.os;
      }
      if (this.modelSysReqEdit.processor === null) {
        this.modelSysReqEdit.processor = this.sysreqrec.processor;
      }
      if (this.modelSysReqEdit.storege === null) {
        this.modelSysReqEdit.storege = this.sysreqrec.storege;
      }

      this.modelSysMinEdit.id = this.idGame;
      if (this.modelSysMinEdit.graphics === null) {
        this.modelSysMinEdit.graphics = this.sysreqmin.graphics;
      }
      if (this.modelSysMinEdit.memory === null) {
        this.modelSysMinEdit.memory = this.sysreqmin.memory;
      }
      if (this.modelSysMinEdit.os === null) {
        this.modelSysMinEdit.os = this.sysreqmin.os;
      }
      if (this.modelSysMinEdit.processor === null) {
        this.modelSysMinEdit.processor = this.sysreqmin.processor;
      }
      if (this.modelSysMinEdit.storege === null) {
        this.modelSysMinEdit.storege = this.sysreqmin.storege;
      }


      console.log(this.selectedLang);
      console.log(this.selectedCateg);

      console.log(this.modelEdit);
      console.log(this.modelSysReqEdit);
      console.log(this.modelSysMinEdit);

      //this.modelEdit.listidCateg = this.selectedCateg;
      //this.modelEdit.listidLang = this.selectedLang;

      console.log(this.modelEdit.listidCateg);
      console.log(this.modelEdit.listidLang);

      this.spiner.show('mySpinner');
      this.productService.editProduct(this.modelEdit).subscribe(
        (data: ApiResponse) => {
          if (data.status === 200) {


            this.notifier.notify('success', 'Game removed!');
            this.spiner.hide('mySpinner');
            console.log(this.modelEdit);
          } else {
            for ( let i = 0; i < data.errors; i++) {
              this.notifier.notify('error', data.errors[i]);
            }
          }
        }
      );
      this.spiner.show('mySpinner');
      this.productService.editRecSysReq(this.modelSysReqEdit).subscribe(
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
      this.spiner.show('mySpinner');
      this.productService.editMinSysReq(this.modelSysMinEdit).subscribe(
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
