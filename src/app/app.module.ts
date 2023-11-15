import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from 'src/shared/shared.module';
import { MaterialModule } from 'src/material/material.module';
import { MainhomeComponent } from './components/mainhome/mainhome.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { CartComponent } from './components/cart/cart.component';
import { FavouritesComponent } from './components/favourites/favourites.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SupportComponent } from './components/support/support.component';
import { NavbarComponent } from 'src/shared/sharedcomp/navbar/navbar.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { CarouselModule } from 'primeng/carousel';
import { LogoutComponent } from './components/logout/logout.component';
import { CardComponent } from './components/card/card.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { SearchComponent } from './components/search/search.component';
import { NavComponent } from './components/nav/nav.component';
import { FoodcardComponent } from './components/foodcard/foodcard.component';
import { RestaurantdetailsComponent } from './components/restaurantdetails/restaurantdetails.component';
import {FieldsetModule} from 'primeng/fieldset';
import { DeliverydashboardComponent } from './components/deliverydashboard/deliverydashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    MainhomeComponent,
    DashboardComponent,
    CartComponent,
    FavouritesComponent,
    ProfileComponent,
    SupportComponent,
    PagenotfoundComponent,
    LogoutComponent,
    CardComponent,
    SearchComponent,
    NavComponent,
    FoodcardComponent,
    RestaurantdetailsComponent,
    DeliverydashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    MaterialModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CarouselModule,
    CardModule,
    ButtonModule,
    FieldsetModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
