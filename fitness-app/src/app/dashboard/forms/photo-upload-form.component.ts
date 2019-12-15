import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CustomerService } from 'src/app/customer/services/customer.service';
import { Customer } from 'src/app/models/customer';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-photo-upload-form',
  templateUrl: './photo-upload-form.component.html',
  styleUrls: ['./photo-upload-form.component.css']
})
export class PhotoUploadFormComponent implements OnInit {

  @ViewChild('imageFile', { static: false }) imageFile: ElementRef;

  filename: string;
  selectedCustId: string = "Select customer"
  customers: Customer[] = [];

  constructor(
    private custSvc: CustomerService,
    public dialogRef: MatDialogRef<PhotoUploadFormComponent>
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

  close() {
    this.dialogRef.close(false);
  }

  processForm(form: NgForm) {
    const formData: FormData = new FormData()

    formData.append('custId', this.selectedCustId);
    formData.append('image-file', this.imageFile.nativeElement.files[0]);

    this.custSvc.uploadPhoto(formData)
      .then(result => {
        console.info('Uploaded');
        this.filename = result['filename'];
        this.dialogRef.close(true);
      })
      .catch(err => {
        console.error('Uploaded error');
        this.dialogRef.close(false);
      })
  }
}
