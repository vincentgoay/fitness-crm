import { Component, OnInit, Inject } from '@angular/core';
import { CustomerService } from 'src/app/customer/services/customer.service';
import { Customer } from 'src/app/models/customer';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-customer-form',
  templateUrl: './edit-customer-form.component.html',
  styleUrls: ['./edit-customer-form.component.css']
})
export class EditCustomerFormComponent implements OnInit {

  constructor(
    private custSvc: CustomerService,
    public dialogRef: MatDialogRef<EditCustomerFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Customer
  ) { }

  ngOnInit() {
  }

  updateForm(form: NgForm) {
    const input = form.value;
    const updateCust: Customer = this.data;

    console.info('Update customer: ', updateCust);
    this.update(updateCust);
  }

  delete() {
    this.custSvc.deleteCustomer(this.data._id)
    .then(result => {
      console.info('Delete new customer: ', result);
      this.dialogRef.close(true);
    })
    .catch(err => {
      console.error('Error delete new customer: ', err)
      this.dialogRef.close(false);
    })
  }

  private update(customer: Customer) {
    this.custSvc.updateCustomer(customer)
    .then(result => {
      console.info('Update new customer: ', result);
      this.dialogRef.close(true);
    })
    .catch(err => {
      console.error('Error update new customer: ', err)
      this.dialogRef.close(false);
    })
  }
}
