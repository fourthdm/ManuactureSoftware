import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { RestService } from 'src/app/services/rest.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-purchaseorder',
  templateUrl: './purchaseorder.component.html',
  styleUrls: ['./purchaseorder.component.css']
})
export class PurchaseorderComponent implements OnInit {

  AllPurchaseOrderData: any[] = [];
  AllRequirementData: any[] = [];

  pro: any;

  Quotations: any[] = [];

  AddpurchaseorderForm: FormGroup;
  EditpurchaseorderForm: FormGroup;

  SelectedPurchaseOrderData: any;

  constructor(private _rest: RestService, private _state: StateService) {
    this.AddpurchaseorderForm = new FormGroup({
      Quotation_Number: new FormControl('', [Validators.required]),
      Requirement_No: new FormControl('', [Validators.required]),
      Client_Name: new FormControl('', [Validators.required]),
      Material_Type: new FormControl('', [Validators.required]),
      Payment_term: new FormControl('', [Validators.required]),
      Product_Name: new FormControl('', [Validators.required]),
      Product_Quantity: new FormControl('', [Validators.required]),
      Rate: new FormControl('', [Validators.required]),
      Subtotal: new FormControl('', [Validators.required]),
      CGST_amount: new FormControl('', [Validators.required]),
      SGST_amount: new FormControl('', [Validators.required]),
      Total_Amount: new FormControl('', [Validators.required]),
      Discount_Amount: new FormControl('', [Validators.required]),
      HSN_Code: new FormControl(''),
      Client_Address: new FormControl('', [Validators.required]),
      Purchase_Address: new FormControl('', [Validators.required]),
      Delivery_Date: new FormControl(''),
      Status: new FormControl('', [Validators.required]),
    });

    this.EditpurchaseorderForm = new FormGroup({
      Id: new FormControl(''),
      Quotation_Number: new FormControl('', [Validators.required]),
      Requirement_No: new FormControl('', [Validators.required]),
      Client_Name: new FormControl('', [Validators.required]),
      Material_Type: new FormControl('', [Validators.required]),
      Payment_term: new FormControl('', [Validators.required]),
      Product_Name: new FormControl('', [Validators.required]),
      Product_Quantity: new FormControl('', [Validators.required]),
      Rate: new FormControl('', [Validators.required]),
      Subtotal: new FormControl('', [Validators.required]),
      CGST_amount: new FormControl('', [Validators.required]),
      SGST_amount: new FormControl('', [Validators.required]),
      Total_Amount: new FormControl('', [Validators.required]),
      Discount_Amount: new FormControl('', [Validators.required]),
      HSN_Code: new FormControl(''),
      Client_Address: new FormControl('', [Validators.required]),
      Purchase_Address: new FormControl('', [Validators.required]),
      Delivery_Date: new FormControl(''),
      Status: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.Allrequirements();
    this.AllPurchaseOrder();
    this.ALLQuotation();
    this.AddpurchaseorderForm.get('Quotation_Number')?.valueChanges
      .subscribe(reqNo => {
        if (reqNo) {
          this.autoFillByRequirement(reqNo);
        }
      });
  }

  autoFillByRequirement(reqNo: string) {
    const req = this.Quotations.find(
      (r: any) => r.Quotation_Number === reqNo
    );

    if (!req) return;

    this.AddpurchaseorderForm.patchValue({
      Requirement_No: req.Requirement_No,
      Material_Type: req.Material_Type,
      Client_Name: req.Client_Name,
      Product_Name: req.Product_Name,
      Product_Quantity: req.Product_Quantity,
      Client_Address: req.Client_Address,
      Rate: req.Rate,
      Subtotal: req.Subtotal,
      CGST_amount: req.CGST_amount,
      SGST_amount: req.SGST_amount,
      Total_Amount: req.Total_Amount,
      Discount_Amount: req.Discount_Amount,
      HSN_Code: req.HSN_Code,
      Payment_term: req.Payment_term
    });
  }

  ALLQuotation() {
    this._rest.AllQuotation().subscribe((data: any) => {
      console.log(data);
      this.Quotations = data.data;
    }, (err: any) => {
      console.log(err);
    });
  }

  Allrequirements() {
    this._rest.AllRequirement().subscribe((res: any) => {
      this.AllRequirementData = res.data;
    }, (err: any) => {
      console.error('Error fetching requirements:', err);
      console.log(err);
    });
  }

  AllPurchaseOrder() {
    this._rest.AllPurchaseOrder().subscribe((data: any) => {
      this.AllPurchaseOrderData = data.data;
    }, (err: any) => {
      console.log(err);
      alert('Error while fetching Purchase Order data');
    });
  }

  AddPurchaseOrder() {
    this._rest.AddPurchaseOrder(this.AddpurchaseorderForm.value).subscribe((data: any) => {
      alert(data.message);
      this.AllPurchaseOrder();
      this.AddpurchaseorderForm.reset();
    }, (err: any) => {
      console.log(err);
      alert('Error while adding Purchase Order');
    });
  }


  EditPurchaseOrder(Id: any) {
    const selectpurchaseorder = this.AllPurchaseOrderData.find(purchaseorder => purchaseorder.Id === Id)
    // if (selectpurchaseorder) {
    //   this.SelectedPurchaseOrderData = 1;
    //   this.EditpurchaseorderForm.patchValue(selectpurchaseorder);
    // }

    if (!selectpurchaseorder) {
      console.log(`Purchase Order with ID ${Id} not found.`);
      return;
    }
    this.SelectedPurchaseOrderData = 1;
    // 🔑 Convert Due_Date to yyyy-MM-dd
    const DeliveryDate = selectpurchaseorder.Delivery_Date
      ? new Date(selectpurchaseorder.Delivery_Date).toISOString().split('T')[0]
      : '';

    // ✅ Patch everything, but override Due_Date
    this.EditpurchaseorderForm.patchValue({
      ...selectpurchaseorder,
      Delivery_Date: DeliveryDate
    });
  }

  UpdatePurchaseOrder() {
    this._rest.EditPurchaseOrder(this.EditpurchaseorderForm.value).subscribe((data: any) => {
      alert(data.message);
      this.AllPurchaseOrder();
    }, (err: any) => {
      console.log(err);
      alert('Error while updating Purchase Order');
    });
  }

  DeletePurchaseOrder(Id: number) {
    if (confirm("Are you sure to delete this Purchase Order?")) {
      this._rest.DeletePurchaseOrder(Id).subscribe((data: any) => {
        alert(data.message);
        this.AllPurchaseOrder();
      }, (err: any) => {
        console.log(err);
        alert('Error while deleting Purchase Order');
      });
    }
  }


  printPdf(Id: any) {
    this._rest.GeneratePurchaseOrder(Id)
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