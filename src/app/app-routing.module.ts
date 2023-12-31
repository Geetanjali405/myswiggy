import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainhomeComponent } from './components/mainhome/mainhome.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CartComponent } from './components/cart/cart.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FavouritesComponent } from './components/favourites/favourites.component';
import { SupportComponent } from './components/support/support.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { SearchComponent } from './components/search/search.component';
import { RestaurantdetailsComponent } from './components/restaurantdetails/restaurantdetails.component';
import { DeliverydashboardComponent } from './components/deliverydashboard/deliverydashboard.component';
import { OrderstatusComponent } from './components/orderstatus/orderstatus.component';
import { authGuard } from './guards/auth.guard';
import { OffersComponent } from './components/offers/offers.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { AdminpanelComponent } from './components/adminpanel/adminpanel.component';

const routes: Routes = [
  { path: '', component: MainhomeComponent },
  { path: 'mainhome', component: MainhomeComponent },
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
  { path: 'cart', canActivate: [authGuard], component: CartComponent },
  { path: 'profile', canActivate: [authGuard], component: ProfileComponent },
  {
    path: 'favourites',
    canActivate: [authGuard],
    component: FavouritesComponent,
  },
  { path: 'customersupport', component: SupportComponent },
  { path: 'search', component: SearchComponent },
  { path: 'restaurant/:id', component: RestaurantdetailsComponent },
  { path: 'orderstatuscomp', component: OrderstatusComponent },
  { path: 'offer', component: OffersComponent },
  { path: 'cat', component: CategoriesComponent },
  { path: 'notfound', component: PagenotfoundComponent },
  { path: 'admin', component: AdminpanelComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
