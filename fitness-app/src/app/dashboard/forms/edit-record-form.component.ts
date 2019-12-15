import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Record } from 'src/app/models/record';
import { CustomerService } from 'src/app/customer/services/customer.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-record-form',
  templateUrl: './edit-record-form.component.html',
  styleUrls: ['./edit-record-form.component.css']
})
export class EditRecordFormComponent implements OnInit {

  constructor(
    private custSvc: CustomerService,
    public dialogRef: MatDialogRef<EditRecordFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Record
  ) { }

  ngOnInit() {
  }

  processForm(form: NgForm) {
    this.updateRecord(this.data);
  }

  private updateRecord(record: Record) {
    this.custSvc.updateRecord(record)
      .then(result => {
        console.info('Update new record: ', result);
        this.dialogRef.close(true);
      })
      .catch(err => {
        console.error('Error update new record: ', err);
        this.dialogRef.close(false);
      })
  }

}
