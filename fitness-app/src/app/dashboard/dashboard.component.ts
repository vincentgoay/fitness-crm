import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { Location } from '@angular/common';
import { MatSidenav, MatDialog, MatDialogRef } from '@angular/material';
import { CustomerFormComponent } from './forms/customer-form.component';
import { RecordFormComponent } from './forms/record-form.component';
import { Customer } from '../models/customer';
import { Record } from '../models/record';
import { EditCustomerFormComponent } from './forms/edit-customer-form.component';
import { EditRecordFormComponent } from './forms/edit-record-form.component';
import { PhotoUploadFormComponent } from './forms/photo-upload-form.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  fillerNav = [
    { label: 'Customers', path: 'customers', selected: false },
    { label: 'Subscription', path: 'subscription', selected: false },
    { label: 'Settings', path: 'settings', selected: false },
    { label: 'Logout', path: 'logout', selected: false }
  ]

  @ViewChild('snav', { static: true }) sidenavRef: MatSidenav;
  @Output() reloadCustomerListEvent = new EventEmitter();

  private _selectedMenuIndex: number;
  get selectedMenuIndex(): number {
    return this._selectedMenuIndex;
  }

  constructor(
    private location: Location,
    public formDialog: MatDialog
  ) { }

  ngOnInit() {
  }

  goBack() {
    this.location.back();
  }

  updateMenuState(idx: number) {
    console.info('>>> menu selected: ', idx);
    this._selectedMenuIndex = idx;
    this.sidenavRef.close();
  }

  newCustomer() {
    console.info('add new records');
    this.openCustomerFormDialog()
      .afterClosed()
      .subscribe(result => {
        console.info('Dialog result after closed: ', result);
        this.reloadCustomerListEvent.emit();
      })
  }

  newRecord() {
    console.info('add new records');
    this.openRecordFormDialog()
      .afterClosed()
      .subscribe(result => {
        console.info('Dialog result after closed: ', result);
        // this.reloadCustomerListEvent.emit();
      })
  }

  newPhoto() {
    console.info('add new photo');
    this.openPhotoUploadFormDialog()
      .afterClosed()
      .subscribe(result => {
        console.info('Dialog result after closed: ', result);
        // this.reloadCustomerListEvent.emit();
      })
  }

  public openCustomerFormDialog(obj?: Customer): MatDialogRef<any> {
    if (obj) {
      return (
        this.formDialog.open(EditCustomerFormComponent, {
          maxWidth: '95vw',
          panelClass: 'custom-dialog-container',
          data: obj || null
        })
      )
    } else {
      return (
        this.formDialog.open(CustomerFormComponent, {
          maxWidth: '95vw',
          panelClass: 'custom-dialog-container'
        })
      )
    }
  }

  public openRecordFormDialog(obj?: Record): MatDialogRef<any> {
    if (obj) {
      return (
        this.formDialog.open(EditRecordFormComponent, {
          maxWidth: '95vw',
          panelClass: 'custom-dialog-container',
          data: obj || null
        })
      )
    } else {
      return (
        this.formDialog.open(RecordFormComponent, {
          maxWidth: '95vw',
          panelClass: 'custom-dialog-container'
        })
      )
    }
  }

  public openPhotoUploadFormDialog(): MatDialogRef<any> {
    return (
      this.formDialog.open(PhotoUploadFormComponent, {
        maxWidth: '95vw',
        panelClass: 'custom-dialog-container'
      })
    )
  }
}
