import { Component, Inject, Optional } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Item } from '../item';
import { Bill } from '../bill';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css'],
})
export class PopUpComponent {
  itemList: Item[] = [];
  billForm!: FormGroup;
  addFlag = true;
  constructor(
    public dialogRef: MatDialogRef<PopUpComponent, Bill>,
    @Optional()
    @Inject(MAT_DIALOG_DATA)
    public data: { bid: number; bill: Bill; createFlag: boolean }
  ) {
    this.addFlag = data.createFlag;
    if (data.bill) {
      this.billForm = new FormGroup({
        customerName: new FormControl({
          value: data.bill.customerName,
          disabled: true,
        }),
        phoneNumber: new FormControl({
          value: data.bill.phoneNumber,
          disabled: true,
        }),
        email: new FormControl({
          value: data.bill.email,
          disabled: true,
        }),
        items: new FormGroup({
          productName: new FormControl(' ', Validators.required),
          quantity: new FormControl('1', Validators.required),
          price: new FormControl('', Validators.required),
        }),
        billAmount: new FormControl({
          value: data.bill.billAmount,
          disabled: true,
        }),
      });
      this.itemList = data.bill.items;
    } else {
      this.billForm = new FormGroup({
        customerName: new FormControl(' '),
        phoneNumber: new FormControl(''),
        email: new FormControl(''),
        items: new FormGroup({
          productName: new FormControl(' ', Validators.required),
          quantity: new FormControl(' ', Validators.required),
          price: new FormControl('', Validators.required),
        }),
        billAmount: new FormControl({ value: 0, disabled: true }),
      });
    }
  }

  flag1 = false;
  flag2 = false;

  setFlag() {
    let itemControl = this.billForm.get('items');

    if (itemControl)
      this.flag1 = itemControl.get('productName')?.value == '' ? false : true;
  }

  addItem() {
    let itemCtrl = this.billForm.controls['items'];
    if (itemCtrl) {
      let pdname = itemCtrl.get('productName');
      let pdquantity = itemCtrl.get('quantity');
      let pdcost = itemCtrl.get('price');
      if (
        pdname &&
        pdquantity &&
        pdcost &&
        pdname.value != '' &&
        parseInt(pdquantity.value) > 0 &&
        parseFloat(pdcost.value) > 0
      ) {
        this.itemList.push({
          productName: pdname.value,
          quantity: parseInt(pdquantity.value),
          price: parseInt(pdcost.value),
        });
        console.log(this.itemList);
        let cost = 0;
        for (let item of this.itemList) {
          cost += item.quantity * item.price;
        }
        this.billForm.controls['billAmount'].setValue(cost);
        pdname.setValue('');
        pdquantity.setValue('');
        pdcost.setValue('');
        this.flag1 = false;
      } else {
        alert('Give valid values');
      }
    }
  }
  closeDialog() {
    this.dialogRef.close();
  }
  popSave() {
    let bill = {
      id: this.data.bid,
      customerName: this.billForm.get('customerName')?.value,
      phoneNumber: this.billForm.get('phoneNumber')?.value,
      email: this.billForm.get('email')?.value,
      items: this.itemList,
      billAmount: this.billForm.get('billAmount')?.value,
    };
    console.log('popsave' + JSON.stringify(bill));
    this.dialogRef.close(bill);
  }
}
