import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { NotLoginGuard } from './guards/notLogin.guard';
import { SignUpComponent } from './sign-up/sign-up.component';
import { GameComponent } from './game/game.component';
import { LibraryComponent } from './library/library.component';
import { AdminGuard } from './guards/admin.guard';
import { AdminAreaComponent } from './admin-area/admin-area.component';
import { EditProductComponent } from './admin-area/admin-panel/edit-product/edit-product.component';
import { AddProductComponent } from './admin-area/admin-panel/add-product/add-product.component';
import { AdminPanelComponent } from './admin-area/admin-panel/admin-panel.component';

const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'sign-in', canActivate: [NotLoginGuard], pathMatch: 'full', component: SignInComponent },
    { path: 'sign-up', canActivate: [NotLoginGuard], pathMatch: 'full', component: SignUpComponent },
    { path: 'game/:id', component: GameComponent},
    { path: 'library', component: LibraryComponent},
    { path: 'admin-panel' , component: AdminAreaComponent,
      canActivate: [AdminGuard],
      children: [
      { path: 'table', component: AdminPanelComponent, pathMatch: 'full'},
      { path: 'add', component: AddProductComponent},
      { path: 'edit/:id', component: EditProductComponent},
      ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
