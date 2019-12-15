import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../services/customer.service';
import { Customer } from 'src/app/models/customer';
import { CustomerDetailOverviewComponent } from './customer-detail-overview.component';
import { DashboardModule } from 'src/app/dashboard/dashboard.module';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';
import { MatDialog } from '@angular/material';
import { Record } from 'src/app/models/record';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit, AfterViewInit {
  @ViewChild(CustomerDetailOverviewComponent, { static: false }) overviewRef: CustomerDetailOverviewComponent;

  private _customerId: string;
  private _formDialog: MatDialog;

  customer: Customer;
  records: Record[];
  // get customer(): Customer {
  //   return this._customer;
  // }

  constructor(
    private activatedRoute: ActivatedRoute,
    private custSvc: CustomerService,
    private dashboardComp: DashboardComponent
  ) { }

  ngOnInit() {
    this._formDialog = this.dashboardComp.formDialog;
    this._customerId = this.activatedRoute.snapshot.params.cid;
    console.info('>>> Customer ID: ', this._customerId);
    this.fetchCustomerBy(this._customerId)
  }

  ngAfterViewInit() {
  }

  reloadTab(index: number) {
    console.info('Selected Tab: ', index);
  }

  fetchCustomerBy(id: string) {
    this.custSvc.getCustomer(id)
      .then(result => {
        console.info('>>> Customer Result: ', result);
        this.customer = result;
        this.records = (result.records)

        console.info('Customer: ', this.customer);
        console.info('Records: ', this.records);
      })
  }

  reloadData() {
    this.fetchCustomerBy(this._customerId);
  }
}
