import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotifierModule, NotifierOptions } from 'angular-notifier';


import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { AppRoutingModule } from './app-routing.module';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { GameComponent } from './game/game.component';
import { LibraryComponent } from './library/library.component';
import { AddProductComponent } from './admin-panel/add-product/add-product.component';
import { EditProductComponent } from './admin-panel/edit-product/edit-product.component';

import { TokenInterceptor } from './interceptor';

import { DemoMaterialModule } from './material.module';
import { DemoNgZorroAntdModule } from './ng-zorro-antd.module';
//import { DemoPrimeNGExport } from './primeng.module';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { FooterComponent } from './footer/footer.component';

registerLocaleData(en);

const configNotifier: NotifierOptions = {
  position: {
    horizontal: {
      position: 'right'
    },
    vertical: {
      position: 'top'
    }
  }
};

@NgModule({
  declarations: [	
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    SignUpComponent,
    SignInComponent,
    GameComponent,
    LibraryComponent,
    AdminPanelComponent,
    AddProductComponent,
    EditProductComponent,
      FooterComponent
   ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    NotifierModule.withConfig(configNotifier),
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    DemoNgZorroAntdModule,
  //  DemoPrimeNGExport
  ],
  providers: [
    NgxSpinnerService,
    { provide: NZ_I18N, useValue: en_US },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
