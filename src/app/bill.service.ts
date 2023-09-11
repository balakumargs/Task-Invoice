import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bill } from './bill';

@Injectable({
  providedIn: 'root',
})
export class BillService {
  deleteBill(billId: number) {
    throw new Error('Method not implemented.');
  }
  bills!: Bill[];
  constructor(private httpClient: HttpClient) {}

  url = '../assets/data/sampleBill.json';

  public getSampleBills() {
    return this.httpClient.get<Bill[]>(this.url);
  }
}
