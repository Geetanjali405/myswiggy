import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainhomeComponent } from './components/mainhome/mainhome.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CartComponent } from './components/cart/cart.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FavouritesComponent } from './components/favourites/favourites.component';

import { SupportComponent } from './components/support/support.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { LogoutComponent } from './components/logout/logout.component';
// import { authGuard } from './guards/auth.guard';
import { SearchComponent } from './components/search/search.component';
import { RestaurantdetailsComponent } from './components/restaurantdetails/restaurantdetails.component';
import { DeliverydashboardComponent } from './components/deliverydashboard/deliverydashboard.component';
import { OrderstatusComponent } from './components/orderstatus/orderstatus.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: MainhomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: MainhomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    component: DashboardComponent,
  },
  {
    path: 'deliverydashboard',
    canActivate: [authGuard],
    component: DeliverydashboardComponent,
   
  },

  { path: 'cart', component: CartComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'favourites', component: FavouritesComponent },
  { path: 'customersupport', component: SupportComponent },
  { path: 'search', component: SearchComponent },
  { path: 'restaurant/:id', component: RestaurantdetailsComponent },
  { path: 'notfound', component: PagenotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
