import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-deliverychallan',
  templateUrl: './deliverychallan.component.html',
  styleUrls: ['./deliverychallan.component.css']
})
export class DeliverychallanComponent implements OnInit {
  pro: any;
  AllChallan: any[] = [];

  AllPurchaseOrders: any[] = [];
  AllPurchaseOrderData: any[] = [];
  AllBill: any[] = [];

  ChallanAddform: FormGroup;
  EditChallanAddform: FormGroup;

  constructor(private _rest: RestService, private _route: Router, private fb: FormBuilder) {
    this.ChallanAddform = new FormGroup({
      Quotation_Number: new FormControl(''),
      Purchase_Number: new FormControl(''),
      Requirement_No: new FormControl(''),
      Client_Name: new FormControl(''),
      Product_Name: new FormControl('', [Validators.required]),
      Product_Quantity: new FormControl('', [Validators.required]),
      Rate: new FormControl('', [Validators.required]),
      Subtotal: new FormControl(''),
      CGST_amount: new FormControl(''),
      SGST_amount: new FormControl(''),
      Total_Amount: new FormControl(''),
      Discount_Amount: new FormControl(''),
      HSN_Code: new FormControl(''),
      GST_No: new FormControl(''),
      Mode_of_Transport: new FormControl(''),
      Name_of_Transport: new FormControl(''),
      Vehicle_No: new FormControl(''),
      Remark: new FormControl(''),
      Challan_Status: new FormControl('')
    });

    this.EditChallanAddform = new FormGroup({
      Challan_id: new FormControl(''),
      Quotation_Number: new FormControl(''),
      Purchase_Number: new FormControl(''),
      Requirement_No: new FormControl(''),
      Client_Name: new FormControl(''),
      Product_Name: new FormControl('', [Validators.required]),
      Product_Quantity: new FormControl('', [Validators.required]),
      Rate: new FormControl('', [Validators.required]),
      Subtotal: new FormControl(''),
      CGST_amount: new FormControl(''),
      SGST_amount: new FormControl(''),
      Total_Amount: new FormControl(''),
      Discount_Amount: new FormControl(''),
      HSN_Code: new FormControl(''),
      GST_No: new FormControl(''),
      Mode_of_Transport: new FormControl(''),
      Name_of_Transport: new FormControl(''),
      Vehicle_No: new FormControl(''),
      Remark: new FormControl(''),
      Challan_Status: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.Challan();
    this.Bills();
    this.AllPurchaseOrder();

    this.ChallanAddform.get('Purchase_Number')?.valueChanges
      .subscribe(PurchaseNumber => {
        if (PurchaseNumber) {
          this.autoFillByRequirement(PurchaseNumber);
        }
      });
  }

  autoFillByRequirement(PurchaseNumber: string) {
    const req = this.AllPurchaseOrderData.find(
      (r: any) => r.Purchase_Number === PurchaseNumber
    );

    if (!req) return;
    // const deliveryDate = req.Delivery_Date ? new Date(req.Delivery_Date).toISOString().split('T')[0] : '';

    this.ChallanAddform.patchValue({
      Requirement_No: req.Requirement_No,
      Quotation_Number: req.Quotation_Number,
      Product_Name: req.Product_Name,
      Product_Quantity: req.Product_Quantity,
      Client_Name: req.Client_Name,
      HSN_Code: req.HSN_Code,
      Rate: req.Rate,
      Subtotal: req.Subtotal,
      CGST_amount: req.CGST_amount,
      SGST_amount: req.SGST_amount,
      Total_Amount: req.Total_Amount,
      Discount_Amount: req.Discount_Amount
    });
  }


  showPrint = false;

  submitchallan() {
    this._rest.AddChallans(this.ChallanAddform.value).subscribe((data: any) => {
      console.log(data);
      this.AllChallan = data.data;
      this.ChallanAddform.reset();
      this.ngOnInit();
    }, (err: any) => {
      console.log(err);
    });
  }

  AllPurchaseOrder() {
    this._rest.AllPurchaseOrder().subscribe((data: any) => {
      this.AllPurchaseOrderData = data.data;
    }, (err: any) => {
      console.log(err);
      alert('Error while fetching Data');
    });
  }

  Bills() {
    this._rest.AllBill().subscribe((data: any) => {
      this.AllBill = data.data;
      console.log(data);
    }, (err: any) => {
      console.log(err);
    });
  }

  downloadPdf(Challan_id: any) {
    this._rest.GenerateChallan(Challan_id)
      .subscribe((file: Blob) => {
        const url = window.URL.createObjectURL(file);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Challan_${Challan_id}.pdf`;
        a.click();
        URL.revokeObjectURL(url);
      });
  }

  printPdf(Challan_id: any) {
    this._rest.GenerateChallan(Challan_id)
      .subscribe((file: Blob) => {
        const url = window.URL.createObjectURL(file);
        const win = window.open('', '_blank');

        if (win) {
          win.document.write(
            `<iframe src="${url}" style="width:100%;height:100%;border:none;"></iframe>`
          );
          setTimeout(() => {
            win.print();
          }, 800);

          URL.revokeObjectURL(url);
        }
      });
  }

  Challan() {
    this._rest.ChallanData().subscribe((data: any) => {
      console.log(data);
      this.AllChallan = data.data;
    }, (err: any) => {
      console.log(err);
    });
  }

}
