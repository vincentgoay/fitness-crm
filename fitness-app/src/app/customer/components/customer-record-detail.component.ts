import { Component, OnInit } from '@angular/core';
import { Record } from 'src/app/models/record';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../services/customer.service';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';

@Component({
  selector: 'app-customer-record-detail',
  templateUrl: './customer-record-detail.component.html',
  styleUrls: ['./customer-record-detail.component.css']
})
export class CustomerRecordDetailComponent implements OnInit {

  private _id: string;
  record: Record;

  constructor(
    private activatedRoute: ActivatedRoute,
    private custSvc: CustomerService,
    private dashboardComp: DashboardComponent
  ) { }

  ngOnInit() {
    this._id = this.activatedRoute.snapshot.params.rid;
    console.info('record id: ', this._id);
    this.reload(this._id);
  }

  editRecord() {
    const stagingData: Record = { ...this.record };
    this.dashboardComp.openRecordFormDialog(stagingData)
    .afterClosed()
    .subscribe(result => {
      console.info('Edit customer: ', result);
      if (result) {
        this.reload(this._id);
      }
    })
  }

  private reload(id: string) {
    this.custSvc.getRecord(id)
      .then(result => {
        console.info('>>> record: ', result);
        this.record = result;
      })
      .catch(err => {
        console.error('>>>>> error: ', err);
      })
  }
}
