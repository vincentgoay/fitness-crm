import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
import { CustomerDetailComponent } from './components/customer-detail.component';
import { CustomerMaterialModule } from './customer-material.module';
import { CustomerService } from './services/customer.service';
import { CustomerDetailOverviewComponent } from './components/customer-detail-overview.component';
import { CustomerDetailRecordsComponent } from './components/customer-detail-records.component';
import { CustomerRecordDetailComponent } from './components/customer-record-detail.component';

@NgModule({
  declarations: [
    CustomerComponent,
    CustomerDetailComponent,
    CustomerDetailOverviewComponent,
    CustomerDetailRecordsComponent,
    CustomerRecordDetailComponent,
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    CustomerMaterialModule
  ],
  providers: []
})
export class CustomerModule { }
