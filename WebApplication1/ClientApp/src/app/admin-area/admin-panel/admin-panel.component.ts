import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiResponse } from 'src/app/Models/api.response';
import { ProductItem } from 'src/app/Models/ProductItem.model';
import { ProductManagerService } from 'src/app/Services/product-manager.service';



@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  constructor(
    private productService: ProductManagerService,
    private spinner: NgxSpinnerService,
    private notifier: NotifierService) { }

    listOfData: ProductItem[] = [];
    listOfSearch: ProductItem[] = [];
    searchText: string;

    nameLang: string;
    nameGanre: string;

    isVisibleLang = false;
    isVisibleGanre = false;

    deleteProduct(id: number) {
      this.spinner.show('mySpinner');
      this.productService.RemoveProduct(id).subscribe(
        (data: ApiResponse) => {
          if (data.status === 200) {
            this.notifier.notify('success', 'Game removed!');

            this.listOfData = this.listOfData.filter(t => t.id !== id);
            this.listOfSearch = this.listOfSearch.filter(t => t.id !== id);
            this.spinner.hide('mySpinner');
          } else {
            for ( let i = 0; i < data.errors; i++) {
              this.notifier.notify('error', data.errors[i]);
            }
          }
        }
      );
    }

  ngOnInit() {
    this.spinner.show('mySpinner');
    this.productService.getAllProducts().subscribe(
    (AllUsers: ProductItem[]) => {
    this.listOfData = AllUsers;
    this.listOfSearch = AllUsers;
  });
  this.spinner.hide('mySpinner');
  }

  Search() {
    this.listOfSearch = this.listOfData.filter(t => t.name.includes(this.searchText) ||
    t.companyName.includes(this.searchText));
  }
  showModalLang(): void {
    this.isVisibleLang = true;
  }

  handleOkLang(): void {
    console.log('Button ok clicked!');
    console.log(this.nameLang);
    this.productService.addLanguage(this.nameLang).subscribe(
      data => {
        console.log(data);
        if (data.status === 200) {
          this.notifier.notify('success', 'Add lang!');
        } else {
          for (let i = 0; i < data.errors.length; i++) {
            this.notifier.notify('error', data.errors[i]);
          }
        }
      });
      this.isVisibleLang = false;
  }

  handleCancelLang(): void {
    console.log('Button cancel clicked!');
    this.isVisibleLang = false;
  }
  showModalGanre(): void {
    this.isVisibleGanre = true;
  }

  handleOkGanre(): void {
    console.log('Button ok clicked!');
    console.log(this.nameGanre);
    this.productService.addGanre(this.nameGanre).subscribe(
      data => {
        console.log(data);
        if (data.status === 200) {
          this.notifier.notify('success', 'Add ganre!');
        } else {
          for (let i = 0; i < data.errors.length; i++) {
            this.notifier.notify('error', data.errors[i]);
          }
        }
      });
      this.isVisibleGanre = false;
    }

  handleCancelGanre(): void {
    console.log('Button cancel clicked!');
    this.isVisibleGanre = false;
  }


}
