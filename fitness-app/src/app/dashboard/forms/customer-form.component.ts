import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/customer/services/customer.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit {

  customer: Customer;
  editMode: boolean = false;

  constructor(
    private custSvc: CustomerService,
    public dialogRef: MatDialogRef<CustomerFormComponent>
  ) { }

  ngOnInit() {
  }

  processForm(form: NgForm) {
    const input = form.value;
    const newCustomer: Customer = {
      name: input.name,
      phone: input.phone,
      height: input.height,
      birth_year: input.birthyear,
      gender: input.gender
    }
    console.info('Create new customer: ', newCustomer);

    this.upload(newCustomer);
  }

  private upload(customer: Customer) {
    this.custSvc.addCustomer(customer)
      .then(result => {
        console.info('Create new customer: ', result);
        this.dialogRef.close(true);
      })
      .catch(err => {
        console.error('Error create new customer: ', err)
        this.dialogRef.close(false);
      })
  }
}
