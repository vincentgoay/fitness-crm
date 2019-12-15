import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';

@Component({
  selector: 'app-customer-detail-overview',
  templateUrl: './customer-detail-overview.component.html',
  styleUrls: ['./customer-detail-overview.component.css']
})
export class CustomerDetailOverviewComponent implements OnInit, OnChanges {

  @Input() customer: Customer;
  @Output() reloadDataEvent = new EventEmitter();

  constructor(
    private dashboardComp: DashboardComponent
  ) { }

  ngOnInit() {
    console.log('Overview customer: ', this.customer);
   }

  ngOnChanges(changes: SimpleChanges) {
    console.info('Simple Changes: ', changes);
  }

  editCustomerDetail() {
    const stagingData: Customer = { ...this.customer };
    console.info('Staging Data: ', stagingData);
    const dialogRef = this.dashboardComp.openCustomerFormDialog(stagingData);

    dialogRef.afterClosed()
      .subscribe(result => {
        console.info('Edit customer: ', result);
        if (result) {
          this.reloadDataEvent.emit();
        }
      })
  }
}
