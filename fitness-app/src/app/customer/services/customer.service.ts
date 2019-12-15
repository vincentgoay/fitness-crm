import { Injectable } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Record } from 'src/app/models/record';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  customerList: Customer[] = [];

  constructor(
    private http: HttpClient
  ) { }

  getCustomers(): Promise<Customer[]> {
    return this.http.get<Customer[]>('api/protected/customers').toPromise();
  }

  getCustomersOb(): Observable<Customer[]> {
    return (
      this.http.get<Customer[]>('api/protected/customers')
    )
  }

  getCustomer(cid: string): Promise<Customer> {
    return this.http.get<Customer>(`api/protected/customers/${cid}`).toPromise();
  }

  addCustomer(cust: Customer): Promise<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded');

    const params = new HttpParams()
      .set('name', cust.name)
      .set('phone', cust.phone)
      .set('height', cust.height.toString())
      .set('birth_year', cust.birth_year.toString())
      .set('gender', cust.gender)

    return (
      this.http.post<any>(`api/protected/customer`, params.toString(), { headers }).toPromise()
    )
  }

  deleteCustomer(custId: string): Promise<any> {
    return (
      this.http.delete<any>(`api/protected/customers/${custId}`).toPromise()
    )
  }


  updateCustomer(cust: Customer): Promise<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded');

    const params = new HttpParams()
      .set('name', cust.name)
      .set('phone', cust.phone)
      .set('height', cust.height.toString())
      .set('birth_year', cust.birth_year.toString())
      .set('gender', cust.gender)

    return (
      this.http.put<any>(`api/protected/customers/${cust._id}`, params.toString(), { headers }).toPromise()
    )
  }

  getRecords(): Promise<Record[]> {
    return this.http.get<Record[]>('api/protected/records').toPromise();
  }

  getRecord(rid: string): Promise<Record> {
    return this.http.get<Record>(`api/protected/records/${rid}`).toPromise();
  }

  addRecord(record: Record): Promise<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded');

    const params = new HttpParams()
      .set('cust_id', record.cust_id)
      .set('weight', record.weight.toString())
      .set('fat_percentage', record.fat_percentage.toString())
      .set('metabolism', record.metabolism.toString())
      .set('visceral_fat', record.visceral_fat.toString())
      .set('bmi', record.bmi.toString())
      .set('muscle_percentage', record.muscle_percentage.toString())
      .set('body_age', record.body_age.toString())
      .set('carotenoid', record.carotenoid.toString())

    console.info('Record data to be added: ', params);
    return this.http.post<any>('api/protected/record', params, { headers }).toPromise()
  }

  updateRecord(record: Record): Promise<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded');

    const params = new HttpParams()
      .set('custId', record.cust_id)
      .set('weight', record.weight.toString())
      .set('fat_percentage', record.fat_percentage.toString())
      .set('metabolism', record.metabolism.toString())
      .set('visceral_fat', record.visceral_fat.toString())
      .set('bmi', record.bmi.toString())
      .set('muscle_percentage', record.muscle_percentage.toString())
      .set('body_age', record.body_age.toString())
      .set('carotenoid', record.carotenoid ? record.carotenoid.toString() : '')

    return (
      this.http.put<any>(`api/protected/records/${record._id}`, params.toString(), { headers }).toPromise()
    )
  }

  // Photo CRUD
  uploadPhoto(data: FormData): Promise<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'multipart/form-data')

    return (
      this.http.post<any>('api/protected/photo', data).toPromise()
    )
  }

}
