import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';
import { RestService } from 'src/app/services/rest.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})

export class BillComponent implements OnInit {

  fileName = 'Bills.xlsx';

  isAdmin: boolean = false;
  isDispatchManager: boolean = false;
  isEmployee: boolean = false;
  isQC: boolean = false;
  isManager: boolean = false;
  isAccountant: boolean = false;

  pro: any;

  AllPurchaseOrderData: any[] = [];
  AllRequirementData: any[] = [];

  AllBill: any[] = [];
  Addbillform: FormGroup;
  Edittbillform: FormGroup;

  SelectedBill: any;

  manualClose = false;

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
      Bill_Status: new FormControl('', [Validators.required]),

      // // 💰 payment
      // Received_Amount: new FormControl('', Validators.required),

      // // 🔒 workorder close (manual)
      // Payment_Status: new FormControl(''),
      // Delivery_Status: new FormControl(''),
      // Work_Close_Status: new FormControl(''),
      // Custom_Remark: new FormControl('')

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
    this.getadmintoken();
    this.getDispatchManger();
    this.getEmployee();
    this.getQC();
    this.getInventoryManager();
    this.getAccountant();

    this.Bills();
    this.AllPurchaseOrder();
    this.Addbillform.get('Purchase_Number')?.valueChanges
      .subscribe(billNo => {
        if (billNo) {
          this.autoFillByRequirement(billNo);
        }
      });
  }
  exportexcel(): void {
    // STEP 4.1 – Create a new array for Excel
    const excelData = this.AllBill.map((q: any, index: number) => {
      return {
        'Sr No': index + 1,
        'Bill Number': q.Bill_Number,
        'Purchase Number': q.Purchase_Number,
        'Client Name': q.Client_Name,
        'Address': q.Client_Address,
        'Product_Name': q.Product_Name,
        'Product_Quantity': q.Product_Quantity,
        'Rate': q.Rate,
        'HSN_Code': q.HSN_Code,
        'CGST_amount': q.CGST_amount,
        'SGST_amount': q.SGST_amount,
        'Subtotal': q.Subtotal,
        'Total_Amount': q.Total_Amount,
        'Discount_Amount': q.Discount_Amount,
        'Payment_term': q.Payment_term,
        'Payment Method': q.Payment_Method,
        'Added Date': q.Added_Date,
        'Updated  Date': q.Updated_Date,
        'Delivery Date': q.Delivery_Date,
        'Bill Status': q.Bill_Status
      };
    });

    // STEP 4.2 – Convert JSON data to worksheet
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(excelData);

    // STEP 4.3 – Create workbook
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();

    // STEP 4.4 – Add worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'AllBill');

    // STEP 4.5 – Download Excel file
    XLSX.writeFile(workbook, 'Bill.xlsx');

  }

  getadmintoken() {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded: any = jwtDecode(token);
      if (decoded.Role === 'SuperAdmin') {
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
      }
    }
  }

  getEmployee() {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded: any = jwtDecode(token);
      if (decoded.Role === 'Employee') {
        this.isEmployee = true;
      } else {
        this.isEmployee = false;
      }
    }
  }

  getDispatchManger() {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded: any = jwtDecode(token);
      if (decoded.Role === 'Dispatch Manager') {
        this.isDispatchManager = true;
      } else {
        this.isDispatchManager = false;
      }
    }
  }

  getQC() {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded: any = jwtDecode(token);
      if (decoded.Role === 'QC') {
        this.isQC = true;
      } else {
        this.isQC = false;
      }
    }
  }

  getAccountant() {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded: any = jwtDecode(token);
      if (decoded.Role === 'Accountant') {
        this.isAccountant = true;
      } else {
        this.isAccountant = false;
      }
    }
  }

  getInventoryManager() {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded: any = jwtDecode(token);
      if (decoded.Role === 'Manager') {
        this.isManager = true;
      } else {
        this.isManager = false;
      }
    }
  }



  workOrderStatus: any;
  billAllowed = false;

  autoFillByRequirement(billNo: string) {

    const req = this.AllPurchaseOrderData.find(
      (r: any) => r.Purchase_Number === billNo
    );
    if (!req) return;
    // if (!req) return;
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
      Delivery_Date: deliveryDate
    });

    // 🔥 FETCH WORKORDER STATUS
    this._rest.getWorkorderStatusByPO(billNo).subscribe((res: any) => {
      if (res.success) {
        this.workOrderStatus = res.data;

        this.billAllowed =
          res.data.Engineer_Status === 'Completed' &&
          res.data.QC_Status === 'Qualified' &&
          res.data.Dispatch_Status === 'Ready to Dispatch';
      } else {
        this.billAllowed = false;
      }
    });
  }



  // autoFillByRequirement(billNo: string) {
  //   const req = this.AllPurchaseOrderData.find(
  //     (r: any) => r.Purchase_Number === billNo
  //   );

  //   if (!req) return;
  //   const deliveryDate = req.Delivery_Date ? new Date(req.Delivery_Date).toISOString().split('T')[0] : '';

  //   this.Addbillform.patchValue({
  //     Product_Name: req.Product_Name,
  //     Product_Quantity: req.Product_Quantity,
  //     Client_Name: req.Client_Name,
  //     Client_Address: req.Client_Address,
  //     HSN_Code: req.HSN_Code,
  //     Rate: req.Rate,
  //     Subtotal: req.Subtotal,
  //     CGST_amount: req.CGST_amount,
  //     SGST_amount: req.SGST_amount,
  //     Total_Amount: req.Total_Amount,
  //     Discount_Amount: req.Discount_Amount,
  //     Payment_term: req.Payment_term,
  //     Delivery_Date: deliveryDate,
  //     Bill_Status: req.Bill_Status
  //   });
  // }

  AllPurchaseOrder() {
    this._rest.AllPurchaseOrder().subscribe((data: any) => {
      this.AllPurchaseOrderData = data.data;
    }, (err: any) => {
      console.log(err);
      alert('Error while fetching Data');
    });
  }

  // canGenerateBill(): boolean {
  //   const po = this.AllPurchaseOrderData.find(
  //     p => p.Purchase_Number === this.Addbillform.value.Purchase_Number
  //   );

  //   if (!po) return false;

  //   return (
  //     po.EngineerStatus === 'Completed' &&
  //     po.QcStatus === 'Qualified' &&
  //     po.DispatchStatus === 'Ready to Dispatch'
  //   );
  // }

  Bills() {
    this._rest.AllBill().subscribe((data: any) => {
      this.AllBill = data.data;
      console.log(data);
    }, (err: any) => {
      console.log(err);
    });
  }

  Createbill() {
    const payload = {
      ...this.Addbillform.value,
      Received_Amount: 10000   // example
    };

    this._rest.AddBill(payload).subscribe((res: any) => {
      alert(res.message);
      this.Addbillform.reset();
      this.ngOnInit();
    });
  }

  // Createbill() {
  //   this._rest.AddBill(this.Addbillform.value).subscribe((data: any) => {
  //     console.log(data);
  //     this.AllBill = data.data;
  //     this.Addbillform.reset();
  //     this.ngOnInit();
  //   }, (err: any) => {
  //     console.log(err);
  //   });
  // }

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

  EditBills(Bill_Id: any) {
    const selectBill = this.AllBill.find(bills => bills.Bill_Id == Bill_Id);

    if (!selectBill) {
      console.log(`Bill with ID ${Bill_Id} not found.`);
      return;
    }
    this.SelectedBill = 1;
    // 🔑 Convert Due_Date to yyyy-MM-dd
    const DeliveryDate = selectBill.Delivery_Date
      ? new Date(selectBill.Delivery_Date).toISOString().split('T')[0]
      : '';

    // ✅ Patch everything, but override Due_Date
    this.Edittbillform.patchValue({
      ...selectBill,
      Delivery_Date: DeliveryDate
    });
  }

  UpdateBills() {
    this._rest.UpdateBills(this.Edittbillform.value).subscribe((data: any) => {
      console.log(data);
      this.AllBill = data.data;
      this.ngOnInit();
      this.Edittbillform.reset();
    }, (err: any) => {
      console.log(err);
    });
  }

  Delete(Bill_Id: any) {
    if (confirm('Are You want to delete a Bill')) {
      this._rest.DeleteBill(Bill_Id).subscribe((data: any) => {
        console.log(data);
        this.ngOnInit();
      }, (err: any) => {
        console.log(err);
      });
    }
  }

}
