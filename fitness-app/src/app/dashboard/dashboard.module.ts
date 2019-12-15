import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardMaterialModule } from './dashboard-material.module';
import { CustomerFormComponent } from './forms/customer-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecordFormComponent } from './forms/record-form.component';
import { EditCustomerFormComponent } from './forms/edit-customer-form.component';
import { EditRecordFormComponent } from './forms/edit-record-form.component';
import { PhotoUploadFormComponent } from './forms/photo-upload-form.component';

@NgModule({
  declarations: [
    DashboardComponent,
    CustomerFormComponent,
    RecordFormComponent,
    EditCustomerFormComponent,
    EditRecordFormComponent,
    PhotoUploadFormComponent,
  ],
  entryComponents: [
    CustomerFormComponent, 
    RecordFormComponent,
    EditCustomerFormComponent,
    EditRecordFormComponent,
    PhotoUploadFormComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    DashboardMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule { }
