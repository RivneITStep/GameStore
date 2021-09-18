import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
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
    private notification: NzNotificationService) { }

    listOfData: ProductItem[] = [];
    listOfSearch: ProductItem[] = [];
    searchText: string;

    nameLang: string;
    nameGanre: string;

    isVisibleLang = false;
    isVisibleGanre = false;

    deleteProduct(id: number) {
      this.spinner.show();
      this.productService.RemoveProduct(id).subscribe(
        (data: ApiResponse) => {
          if (data.status === 200) {
            this.notification.create(
              'success',
              'Notification Title',
              'Delete Product'
            );

            this.listOfData = this.listOfData.filter(t => t.id !== id);
            this.listOfSearch = this.listOfSearch.filter(t => t.id !== id);
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
    }

  ngOnInit() {
    this.spinner.show();
    this.productService.getAllProducts().subscribe(
    (AllUsers: ProductItem[]) => {
    this.listOfData = AllUsers;
    this.listOfSearch = AllUsers;
  });
  setTimeout(() => {
    this.spinner.hide();
  }, 2000);
  }

  Search() {
    this.listOfSearch = this.listOfData.filter(t => t.name.includes(this.searchText) ||
    t.companyName.includes(this.searchText));
  }
}
