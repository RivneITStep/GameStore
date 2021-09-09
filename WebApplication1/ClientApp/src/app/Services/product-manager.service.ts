import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
//import { ProductEdit } from '../Models/product-edit.model';
import { ApiResponse } from '../Models/api.response';
import { ProductAdd } from '../Models/product-add.model';
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

  getAllProducts() {
    return this.http.get(this.baseUrl);
  }

  getNews() {
    return this.http.get(this.baseUrl + '/getNews');
  }

  getPopular() {
    return this.http.get(this.baseUrl + '/getPopular');
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

  // editProduct(id: string, model: ProductEdit): Observable<ApiResponse> {
  //  return this.http.post<ApiResponse>(this.baseUrl + '/editProduct/' + id, model);
  // }

  RemoveProduct(id: number) {
    return this.http.post(this.baseUrl + '/RemoveProduct' + '/' + id, id);

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