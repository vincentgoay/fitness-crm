import { Component, OnInit } from '@angular/core';
import { CustomerService } from './services/customer.service';
import { Customer } from '../models/customer';
import { MatDialog } from '@angular/material';
import { CustomerFormComponent } from '../dashboard/forms/customer-form.component';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  private _customers: Customer[] = [];
  customers: Customer[] = []

  // get customers(): Customer[] {
  //   return this._customers;
  // }

  constructor(
    private custSvc: CustomerService
  ) { }

  ngOnInit() {
    this.fetchCustomersOb();
  }

  private fetchCustomers() {    
    this.custSvc.getCustomers().
    then(result => {
      console.info('Customers: ', result);
      this._customers = result;
    })
  }

  private fetchCustomersOb() {    
    this.custSvc.getCustomersOb()
    .subscribe(result => this.customers = result)
  }
}
