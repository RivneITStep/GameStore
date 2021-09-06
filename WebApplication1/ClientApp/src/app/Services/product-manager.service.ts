import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { ProductAdd } from '../Models/product-add.model';
import { Observable } from 'rxjs';
//import { ProductEdit } from '../Models/product-edit.model';
import { ApiResponse } from '../Models/api.response';
@Injectable({
  providedIn: 'root'
})
export class ProductManagerService {

  constructor(private http: HttpClient) { this.headers = new HttpHeaders(); }
  baseUrl = '/api/Product';
  headers: HttpHeaders;

  //ProductAdd(model: ProductAdd): Observable<ApiResponse> {
  //  return this.http.post<ApiResponse>(this.baseUrl + `/addProduct`, model);
  //}

  getAllProducts() {
    return this.http.get(this.baseUrl);
  }

  getAllLanguages() {
    return this.http.get(this.baseUrl + '/GetLanguages');
  }

  getAllCategories() {
    return this.http.get(this.baseUrl + '/GetCategories');
  }

  //editProduct(id: string, model: ProductEdit): Observable<ApiResponse> {
  //  return this.http.post<ApiResponse>(this.baseUrl + '/editProduct/' + id, model);
  // }

  RemoveProduct(id: number){
    return this.http.post(this.baseUrl + '/RemoveProduct' + '/' + id, id);

  }

  uploadPhoto(fileToUpload: File){
    const formData: FormData = new FormData();

    this.headers.append('Content-Type', 'multipart/form-data')
    formData.append('file', fileToUpload);
    console.log(formData.get('file'));
    return this.http.post<ApiResponse>(this.baseUrl + '/UploadImage' + '/' , formData, {headers: this.headers});
  }

  getLibrary(id: string) {
    return this.http.get(this.baseUrl + '/getLibrary' + '/' + id);
  }

  getProductStore(id: number) {
    return this.http.get(this.baseUrl + '/getProductStore' + '/' + id);
  }

}
