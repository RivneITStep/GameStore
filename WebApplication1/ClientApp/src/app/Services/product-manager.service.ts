import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../Models/api.response';
import { ProductAdd } from '../Models/product-add.model';
import { ProductEdit } from '../Models/product-edit.model';
import { SysReqEdit } from '../Models/sysreq-edit.model';
@Injectable({
  providedIn: 'root'
})
export class ProductManagerService {

  constructor(private http: HttpClient) { this.headers = new HttpHeaders(); }
  baseUrl = '/api/Product';
  headers: HttpHeaders;

  addProduct(model: ProductAdd): Observable<ApiResponse> {
   return this.http.post<ApiResponse>(this.baseUrl + `/addProduct`, model);
  }

  editProduct(model: ProductEdit): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl + '/editProduct' , model);
  }

  editRecSysReq(model: SysReqEdit): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl + '/editRecSysReq' , model);
  }

  editMinSysReq(model: SysReqEdit): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl + '/editMinSysReq' , model);
  }

  getAllProducts() {
    return this.http.get(this.baseUrl);
  }

  getNews() {
    return this.http.get(this.baseUrl + '/getNews');
  }

  getPopular() {
    return this.http.get(this.baseUrl + '/getPopular');
  }

  getRecommendations(id: string) {
    return this.http.get(this.baseUrl + '/getRecommendations' + '/' + id);
  }

  getProductsUser(id: string) {
    return this.http.get(this.baseUrl + '/getProductsUser' + '/' + id);
  }

  getProduct(id: string) {
    return this.http.get(this.baseUrl + '/getProduct' + '/' + id);
  }

  getSysReqMin(id: string) {
    return this.http.get(this.baseUrl + '/getSysReqMin' + '/' + id);
  }

  getLanguagesGame(id: string) {
    return this.http.get(this.baseUrl + '/getLanguagesGame' + '/' + id);
  }

  getGanreGame(id: string) {
    return this.http.get(this.baseUrl + '/getGanreGame' + '/' + id);
  }

  getSysReqRec(id: string) {
    return this.http.get(this.baseUrl + '/getSysReqRec' + '/' + id);
  }

  getAllLanguages() {
    return this.http.get(this.baseUrl + '/GetLanguages');
  }

  getAllCategories() {
    return this.http.get(this.baseUrl + '/GetCategories');
  }



  getAveragePriceForAdmin() {
    return this.http.get(this.baseUrl + '/getAveragePriceForAdmin');
  }
  getLowestPriceForAdmin() {
    return this.http.get(this.baseUrl + '/getLowestPriceForAdmin');
  }
  getHighestPriceForAdmin() {
    return this.http.get(this.baseUrl + '/getHighestPriceForAdmin');
  }
  getPopularGameForAdmin() {
    return this.http.get(this.baseUrl + '/getPopularGameForAdmin');
  }
  getPopularGanreForAdmin() {
    return this.http.get(this.baseUrl + '/getPopularGanreForAdmin');
  }
  getCountSalesPriceForAdmin() {
    return this.http.get(this.baseUrl + '/getCountSalesPriceForAdmin');
  }
  getSalesPriceForAdmin() {
    return this.http.get(this.baseUrl + '/getSalesPriceForAdmin');
  }
  // editProduct(id: string, model: ProductEdit): Observable<ApiResponse> {
  //  return this.http.post<ApiResponse>(this.baseUrl + '/editProduct/' + id, model);
  // }

  RemoveProduct(id: number) {
    return this.http.post(this.baseUrl + '/RemoveProduct' + '/' + id, id);

  }

  RemoveImage(name: string) {
    return this.http.post(this.baseUrl + '/RemoveImage' + '/' + name, name);

  }

  BuyProduct(id: string[] ) {
    return this.http.post(this.baseUrl + '/buyProduct', id);
  }

  uploadPhoto(fileToUpload: File) {
    const formData: FormData = new FormData();

    this.headers.append('Content-Type', 'multipart/form-data');
    formData.append('file', fileToUpload);
    console.log(formData.get('file'));
    return this.http.post<ApiResponse>(this.baseUrl + '/UploadImage' + '/' , formData, {headers: this.headers});
  }

  uploadPhoto1(fileToUpload: File) {
    const formData: FormData = new FormData();

    this.headers.append('Content-Type', 'multipart/form-data');
    formData.append('file', fileToUpload);
    console.log(formData.get('file'));
    return this.http.post<ApiResponse>(this.baseUrl + '/UploadImage1' + '/' , formData, {headers: this.headers});
  }

  uploadPhoto2(fileToUpload: File) {
    const formData: FormData = new FormData();

    this.headers.append('Content-Type', 'multipart/form-data');
    formData.append('file', fileToUpload);
    console.log(formData.get('file'));
    return this.http.post<ApiResponse>(this.baseUrl + '/UploadImage2' + '/' , formData, {headers: this.headers});
  }

  uploadPhoto3(fileToUpload: File) {
    const formData: FormData = new FormData();

    this.headers.append('Content-Type', 'multipart/form-data');
    formData.append('file', fileToUpload);
    console.log(formData.get('file'));
    return this.http.post<ApiResponse>(this.baseUrl + '/UploadImage3' + '/' , formData, {headers: this.headers});
  }

  uploadPhoto4(fileToUpload: File) {
    const formData: FormData = new FormData();

    this.headers.append('Content-Type', 'multipart/form-data');
    formData.append('file', fileToUpload);
    console.log(formData.get('file'));
    return this.http.post<ApiResponse>(this.baseUrl + '/UploadImage4' + '/' , formData, {headers: this.headers});
  }

}


