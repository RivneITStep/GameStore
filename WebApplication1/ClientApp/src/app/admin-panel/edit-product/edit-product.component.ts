import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { CategoriesItem } from 'src/app/Models/categories-item.model';
import { LanguageItem } from 'src/app/Models/language-item.model';
import { ProductAdd } from 'src/app/Models/product-add.model';
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
    private router: Router
    ) { }

    listOfDataLangedit: LanguageItem[] = [];
    listOfDataCategedit: CategoriesItem[] = [];

    selectedCategies: number[] = [];
    selectedLanguages: number[] = [];

    imageBlobHead: File;
    imageBlob1: File;
    imageBlob2: File;
    imageBlob3: File;
    imageBlob4: File;
    isError: boolean;

    product: ProductFullItem;
    sysreqmin: SysReqItem;
    sysreqrec: SysReqItem;


    listOfDataLang: LanguageItem[] = [];
    listOfDataCateg: CategoriesItem[] = [];

    modelSysReqEdit = new SysReqAdd;
    modelSysMinEdit = new SysReqAdd;
    modelEdit = new ProductAdd;

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
      this.productService.getAllLanguages().subscribe(
        (AllLanguages: LanguageItem[]) => {
        this.listOfDataLang = AllLanguages;
        });
      this.productService.getAllCategories().subscribe(
        (AllCategories: CategoriesItem[]) => {
        this.listOfDataCateg = AllCategories;
        this.spiner.hide('mySpinner');
        });

    }

    onSubmit() {
    }

}
