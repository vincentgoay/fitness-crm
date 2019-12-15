import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Record } from 'src/app/models/record';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-customer-detail-records',
  templateUrl: './customer-detail-records.component.html',
  styleUrls: ['./customer-detail-records.component.css']
})
export class CustomerDetailRecordsComponent implements OnInit, OnChanges {

  @Input() records: Record[];

  constructor(
    private custSvc: CustomerService
  ) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    console.info('Changes: ', changes);
  }
}
