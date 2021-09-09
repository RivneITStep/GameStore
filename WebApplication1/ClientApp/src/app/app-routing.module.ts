import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { NotLoginGuard } from './guards/notLogin.guard';
import { SignUpComponent } from './sign-up/sign-up.component';
import { GameComponent } from './game/game.component';
import { LibraryComponent } from './library/library.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AddProductComponent } from './admin-panel/add-product/add-product.component';
import { EditProductComponent } from './admin-panel/edit-product/edit-product.component';

const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'sign-in', canActivate: [NotLoginGuard], pathMatch: 'full', component: SignInComponent },
    { path: 'sign-up', canActivate: [NotLoginGuard], pathMatch: 'full', component: SignUpComponent },
    { path: 'game/:id', component: GameComponent},
    { path: 'library', component: LibraryComponent},
    { path: 'admin', component: AdminPanelComponent},
    { path: 'add', component: AddProductComponent},
    { path: 'edit/:id', component: EditProductComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
