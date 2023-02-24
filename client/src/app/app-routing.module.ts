import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { InventoryComponent } from './inventory/inventory.component';
import { ManageProfileComponent } from './manage-profile/manage-profile.component';
import { AddMedicineComponent } from './add-medicine/add-medicine.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: AuthComponent,
  },
  {
    path: 'register',
    component: AuthComponent,
  },
  {
    path: 'inventory',
    component: InventoryComponent,
  },
  {
    path: 'profile',
    component: ManageProfileComponent,
  },
  {
    path: 'manage-medicine',
    component: AddMedicineComponent,
  },
  {
    path: 'manage-medicine/:id',
    component: AddMedicineComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
