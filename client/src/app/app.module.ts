import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { MatCardModule } from '@angular/material/card';

import { AppComponent } from './app.component';
import { PayhereComponent } from './payhere/payhere.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthComponent } from './auth/auth.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from './footer/footer.component';
import { MedicineComponent } from './medicine/medicine.component';
import { InventoryComponent } from './inventory/inventory.component';
import { ManageProfileComponent } from './manage-profile/manage-profile.component';

@NgModule({
  declarations: [AppComponent, PayhereComponent, AuthComponent, HomeComponent, HeaderComponent, FooterComponent, MedicineComponent, ManageProfileComponent,InventoryComponent, DashboardComponent],

  imports: [
    BrowserModule,
    NgbModule,
    FontAwesomeModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
