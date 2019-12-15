import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerComponent } from './customer.component';
import { CustomerDetailComponent } from './components/customer-detail.component';
import { CustomerRecordDetailComponent } from './components/customer-record-detail.component';

const routes: Routes = [
  { path: '', component: CustomerComponent },
  { path: ':cid', component: CustomerDetailComponent },
  { path: ':cid/:rid', component: CustomerRecordDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
