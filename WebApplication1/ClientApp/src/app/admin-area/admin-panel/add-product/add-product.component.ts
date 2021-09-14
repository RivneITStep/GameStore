import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { CategoriesItem } from 'src/app/Models/categories-item.model';
import { LanguageItem } from 'src/app/Models/language-item.model';
import { ProductAdd } from 'src/app/Models/product-add.model';
import { SysReqAdd } from 'src/app/Models/sysreq-add.model';
import { ProductManagerService } from 'src/app/Services/product-manager.service';
import {ThemePalette} from '@angular/material/core';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  listOfDataLang: LanguageItem[] = [];
  listOfDataCateg: CategoriesItem[] = [];

  selectedCategies: number[] = [];
  selectedLanguages: number[] = [];

  imageBlobHead: File;
  imageBlob1: File;
  imageBlob2: File;
  imageBlob3: File;
  imageBlob4: File;

  color: ThemePalette = 'primary';
  modelSysReq = new SysReqAdd;
  modelSysMin = new SysReqAdd;
  model = new ProductAdd;
  isError: boolean;
  constructor(
    private productService: ProductManagerService,
    private notifier: NotifierService,
    private spiner: NgxSpinnerService,
    private router: Router
    ) { }


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
  }

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

  onSubmit() {

    for (let i = 0; i < this.listOfDataCateg.length; i++) {
      if (this.listOfDataCateg[i].isChecked === true) {
        this.selectedCategies.push(this.listOfDataCateg[i].idCategory);
      }
    }
    console.log(this.selectedCategies);

    for (let i = 0; i < this.listOfDataLang.length; i++) {
      if (this.listOfDataLang[i].isChecked === true) {
        this.selectedLanguages.push(this.listOfDataLang[i].idLanguage);
      }
    }
    console.log(this.selectedLanguages);


    this.spiner.show('mySpinner');
    setTimeout(() => {
      this.spiner.hide('mySpinner');
    }, 4500);
    if (this.model.name === null) {
      this.notifier.notify('error', 'Please, enter full name!');
      this.isError = true;
    }
    if (this.model.developer === null) {
      this.notifier.notify('error', 'Please, enter Company Name!');
      this.isError = true;
    }
    if (this.model.data === null) {
      this.notifier.notify('error', 'Please, enter data!');
      this.isError = true;
    }
    if (this.model.description === null) {
      this.notifier.notify('error', 'Please, enter description!');
      this.isError = true;
    }
    if (this.imageBlobHead === null) {
      this.notifier.notify('error', 'Please, enter image!');
      this.isError = true;
    }
    if (this.model.price === null) {
      this.notifier.notify('error', 'Please, enter price!');
      this.isError = true;
    }
    if (this.modelSysReq.os === null) {
      this.notifier.notify('error', 'Please, enter OS!');
      this.isError = true;
    }
    if (this.modelSysReq.processor === null) {
      this.notifier.notify('error', 'Please, enter Processor!');
      this.isError = true;
    }
    if (this.modelSysReq.graphics === null) {
      this.notifier.notify('error', 'Please, enter Graphics!');
      this.isError = true;
    }
    if (this.modelSysReq.memory === null) {
      this.notifier.notify('error', 'Please, enter Memory!');
      this.isError = true;
    }
    if (this.modelSysReq.storege === null) {
      this.notifier.notify('error', 'Please, enter Storege!');
      this.isError = true;
    }
    if (this.isError === false) {
      this.model.sysreqProduct = this.modelSysReq;
      this.model.sysminProduct = this.modelSysMin;
      this.model.listidCateg = this.selectedCategies;
      this.model.listidLang = this.selectedLanguages;

      const date = new Date().valueOf();
      let text = '';
      const possibleText = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for (let i = 0; i < 5; i++) {
        text += possibleText.charAt(Math.floor(Math.random() * possibleText.length));
      }
      // Replace extension according to your media type

      const imageName = date + '.' + text + '.jpg';
      console.log(imageName);
      const imageFile = new File([this.imageBlobHead], imageName, { type: 'image/jpeg' });
      console.log(imageFile);



      const imageFile1 = new File([this.imageBlob1], 1 + imageName, { type: 'image/jpeg' });
      const imageFile2 = new File([this.imageBlob2], 2 + imageName, { type: 'image/jpeg' });
      const imageFile3 = new File([this.imageBlob3], 3 + imageName, { type: 'image/jpeg' });
      const imageFile4 = new File([this.imageBlob4], 4 + imageName, { type: 'image/jpeg' });

      // tslint:disable-next-line:no-shadowed-variable

      // tslint:disable-next-line:no-shadowed-variable

      this.productService.addProduct(this.model).subscribe(
        data => {
          console.log(data);
          if (data.status === 200) {
            this.notifier.notify('success', 'Add product!');

            // tslint:disable-next-line:no-shadowed-variable
            this.productService.uploadPhoto1(imageFile1).subscribe( data => {
              console.log(data);
            }, error => {
              console.log(error);
            });
            // tslint:disable-next-line:no-shadowed-variable
            this.productService.uploadPhoto2(imageFile2).subscribe( data => {
              console.log(data);
            }, error => {
              console.log(error);
            });
            // tslint:disable-next-line:no-shadowed-variable
            this.productService.uploadPhoto3(imageFile3).subscribe( data => {
              console.log(data);
            }, error => {
              console.log(error);
            });
            // tslint:disable-next-line:no-shadowed-variable
            this.productService.uploadPhoto4(imageFile4).subscribe( data => {
              console.log(data);
            }, error => {
              console.log(error);
            });
            // tslint:disable-next-line:no-shadowed-variable
            this.productService.uploadPhoto(imageFile).subscribe( data => {
              console.log(data);
            }, error => {
              console.log(error);
            });
            // tslint:disable-next-line:no-shadowed-variable
            this.router.navigate(['/admin']);
          } else {
            for (let i = 0; i < data.errors.length; i++) {
              this.notifier.notify('error', data.errors[i]);
            }
          }

        },
        errors => {
          console.log(errors);
        });
        console.log(this.model);
      }

    this.selectedCategies = [];
    this.selectedLanguages = [];

  }

}
