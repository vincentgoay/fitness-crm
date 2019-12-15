import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/customer/services/customer.service';
import { NgForm } from '@angular/forms';
import { Record } from 'src/app/models/record';
import { Customer } from 'src/app/models/customer';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-record-form',
  templateUrl: './record-form.component.html',
  styleUrls: ['./record-form.component.css']
})
export class RecordFormComponent implements OnInit {

  selectedCustId: string = "Select customer"
  customers: Customer[] = [];

  constructor(
    private custSvc: CustomerService,
    public dialogRef: MatDialogRef<RecordFormComponent>
  ) { }

  ngOnInit() {
    this.fetchCustomers();
  }

  private fetchCustomers() {
    this.custSvc.getCustomers()
    .then(result => {
      console.info('Get Customers: ', result)
      this.customers = result;
    })
    .catch(err => {
      console.error('Get customers error: ', err)
    })
  }

  processForm(form: NgForm) {
    const input = form.value;
    const newRecord: Record = {
      cust_id: input.custId,
      weight: input.weight,
      fat_percentage: input.fat_percentage,
      visceral_fat: input.visceral_fat,
      metabolism: input.metabolism,
      bmi: input.bmi,
      muscle_percentage: input.muscle_percentage,
      body_age: input.body_age,
      carotenoid: input.carotenoid
    }
    console.info('>>>Create new record: ', newRecord);

    this.upload(newRecord);
  }

  private upload(record: Record) {
    this.custSvc.addRecord(record)
      .then(result => {
        console.info('Create new record: ', result);
        this.dialogRef.close(true);
      })
      .catch(err => {
        console.error('Error create new record: ', err);
        this.dialogRef.close(false);
      })
  }
}
