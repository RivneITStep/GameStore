import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiResponse } from '../Models/api.response';
import { ProductItem } from '../Models/ProductItem.model';
import { ProductManagerService } from '../Services/product-manager.service';

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

    deleteProduct(id: number) {
      this.spinner.show('mySpinner');
      this.productService.RemoveProduct(id).subscribe(
        (data: ApiResponse) => {
          if(data.status === 200){
            this.notifier.notify('success', 'User removed!');

            this.listOfData = this.listOfData.filter(t => t.id !== id);
            this.listOfSearch = this.listOfSearch.filter(t => t.id !== id);
            this.spinner.hide();
          } else {
            for ( let i = 0; i < data.errors; i++) {
              this.notifier.notify('error', data.errors[i]);
            }
          }
        }
      )
    }

  ngOnInit() {
    this.spinner.show('mySpinner');
    this.productService.getAllProducts().subscribe(
    (AllUsers: ProductItem[]) => {
    this.listOfData = AllUsers;
    this.listOfSearch = AllUsers;
    this.spinner.hide('mySpinner');
  });
  }

  Search(){
    this.listOfSearch = this.listOfData.filter(t => t.name.includes(this.searchText) ||
    t.companyName.includes(this.searchText));
  }
}
