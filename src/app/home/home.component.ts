import { Component, OnInit, ViewChild } from '@angular/core';
import { BillService } from '../bill.service';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { MatDialog } from '@angular/material/dialog';
import { Bill } from '../bill';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  billList: Bill[] = [];

  @ViewChild(MatTable, { static: false }) table1!: MatTable<Bill>;

  displayedColumns: string[] = [
    'id',
    'customerName',
    'phoneNumber',
    'email',
    'items',
    'billAmount',
    'actions',
  ];

  datasource: Bill[] = [];

  constructor(private dialog: MatDialog, private billService: BillService) { }

  ngOnInit(): void {
    this.billService.getSampleBills().subscribe((data) => {
      this.billList = data;
      this.datasource = this.billList;
    });
  }

  openPopup() {
    const dialogRef = this.dialog.open(PopUpComponent, {
      width: '400px',
      height: '460px',
      disableClose: true,
      data: {
        bid:
          this.billList.length > 0 ? this.billList[this.billList.length - 1].id + 1 : 1,
        createFlag: true,
      },
    });

    dialogRef.afterClosed().subscribe((result: Bill) => {
      if (result) {
        this.billList.push(result);
        this.datasource = [...this.billList];
      }
    });
  }

  delete(idx: number) {
    console.log('deleting....' + idx);
    this.billList = this.billList.filter((bill) => bill.id !== idx);
    this.datasource = [...this.billList];
  }

  viewItems(bill1: Bill) {
    this.dialog.open(PopUpComponent, {
      width: '400px',
      height: '460px',
      disableClose: true,
      data: { bid: bill1.id, bill: bill1, createFlag: false },
    });
  }
}
