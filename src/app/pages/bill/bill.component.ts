import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit {

  pro: any;

  AllPurchaseOrderData: any[] = [];
  AllRequirementData: any[] = [];

  AllBill: any[] = [];
  Addbillform: FormGroup;
  Edittbillform: FormGroup;

  constructor(private _rest: RestService) {
    this.Addbillform = new FormGroup({
      Quotation_Number: new FormControl('', [Validators.required]),
      Purchase_Number: new FormControl('', [Validators.required]),
      Requirement_No: new FormControl('', [Validators.required]),
      Product_Name: new FormControl('', [Validators.required]),
      Product_Quantity: new FormControl('', [Validators.required]),
      Client_Name: new FormControl('', [Validators.required]),
      Client_Address: new FormControl('', [Validators.required]),
      HSN_Code: new FormControl(''),
      Rate: new FormControl('', [Validators.required]),
      Subtotal: new FormControl('', [Validators.required]),
      CGST_amount: new FormControl('', [Validators.required]),
      SGST_amount: new FormControl('', [Validators.required]),
      Total_Amount: new FormControl('', [Validators.required]),
      Discount_Amount: new FormControl('', [Validators.required]),
      Payment_term: new FormControl('', [Validators.required]),
      Payment_Method: new FormControl('', [Validators.required]),
      Delivery_Date: new FormControl(''),
      Bill_Status: new FormControl('', [Validators.required])
    });

    this.Edittbillform = new FormGroup({
      Bill_Id: new FormControl(''),
      Quotation_Number: new FormControl('', [Validators.required]),
      Purchase_Number: new FormControl('', [Validators.required]),
      Requirement_No: new FormControl('', [Validators.required]),
      Product_Name: new FormControl('', [Validators.required]),
      Product_Quantity: new FormControl('', [Validators.required]),
      Client_Name: new FormControl('', [Validators.required]),
      Client_Address: new FormControl('', [Validators.required]),
      HSN_Code: new FormControl(''),
      Rate: new FormControl('', [Validators.required]),
      Subtotal: new FormControl('', [Validators.required]),
      CGST_amount: new FormControl('', [Validators.required]),
      SGST_amount: new FormControl('', [Validators.required]),
      Total_Amount: new FormControl('', [Validators.required]),
      Discount_Amount: new FormControl('', [Validators.required]),
      Payment_term: new FormControl('', [Validators.required]),
      Payment_Method: new FormControl('', [Validators.required]),
      Delivery_Date: new FormControl(''),
      Bill_Status: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    this.Bills();
    this.AllPurchaseOrder();
    this.Addbillform.get('Purchase_Number')?.valueChanges
      .subscribe(billNo => {
        if (billNo) {
          this.autoFillByRequirement(billNo);
        }
      });
  }



  autoFillByRequirement(billNo: string) {
    const req = this.AllPurchaseOrderData.find(
      (r: any) => r.Purchase_Number === billNo
    );

    if (!req) return;
    const deliveryDate = req.Delivery_Date ? new Date(req.Delivery_Date).toISOString().split('T')[0] : '';

    this.Addbillform.patchValue({
      Product_Name: req.Product_Name,
      Product_Quantity: req.Product_Quantity,
      Client_Name: req.Client_Name,
      Client_Address: req.Client_Address,
      HSN_Code: req.HSN_Code,
      Rate: req.Rate,
      Subtotal: req.Subtotal,
      CGST_amount: req.CGST_amount,
      SGST_amount: req.SGST_amount,
      Total_Amount: req.Total_Amount,
      Discount_Amount: req.Discount_Amount,
      Payment_term: req.Payment_term,
      Delivery_Date: deliveryDate,
      Bill_Status: req.Bill_Status
    });
  }

  AllPurchaseOrder() {
    this._rest.AllPurchaseOrder().subscribe((data: any) => {
      this.AllPurchaseOrderData = data.data;
    }, (err: any) => {
      console.log(err);
      alert('Error while fetching Bill Data');
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

  Createbill() {
    this._rest.AddBill(this.Addbillform.value).subscribe((data: any) => {
      console.log(data);
      this.AllBill = data.data;
      this.Addbillform.reset();
    }, (err: any) => {
      console.log(err);
    });
  }

  printPdf(Bill_Id: any) {
    this._rest.GenerateBill(Bill_Id)
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


}
