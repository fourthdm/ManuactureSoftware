import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { RestService } from 'src/app/services/rest.service';
import { StateService } from 'src/app/services/state.service';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-workorder',
  templateUrl: './workorder.component.html',
  styleUrls: ['./workorder.component.css']
})
export class WorkorderComponent implements OnInit {

  fileName = 'Workorder.xlsx';

  isAdmin: boolean = false;
  isDispatchManager: boolean = false;
  isEmployee: boolean = false;
  isQC: boolean = false;
  isManager: boolean = false;
  isAccountant: boolean = false;

  AllWorkOrderData: any[] = [];
  AllPurchaseOrderData: any[] = [];
  AllRequirementData: any[] = [];

  pro: any;

  AllManagerdata: any[] = [];
  AllEngineerdata: any[] = [];
  AllQCdata: any[] = [];
  AllDispatchManagerdata: any[] = [];

  AddWorkorderForm: FormGroup;
  EditWorkorderForm: FormGroup;

  SelectedWorkOrderData: any;

  @Input() WorkOrder_Status: any;

  constructor(private _rest: RestService, private _state: StateService) {
    this.AddWorkorderForm = new FormGroup({
      Requirement_No: new FormControl('', [Validators.required]),
      Purchase_Number: new FormControl('', [Validators.required]),
      Payment_term: new FormControl('', [Validators.required]),
      Product_Name: new FormControl('', [Validators.required]),
      Product_Quantity: new FormControl('', [Validators.required]),
      Material_Type: new FormControl('', [Validators.required]),
      Manager_Name: new FormControl('', [Validators.required]),
      Engineer_Name: new FormControl(''),
      QC_Name: new FormControl(''),
      DispatchManager_Name: new FormControl(''),
      Client_Name: new FormControl('', [Validators.required]),
      WorkOrder_Status: new FormControl('', [Validators.required]),
      Due_Date: new FormControl('')
    });

    this.EditWorkorderForm = new FormGroup({
      Workorder_Id: new FormControl(''),
      Requirement_No: new FormControl('', [Validators.required]),
      Purchase_Number: new FormControl('', [Validators.required]),
      Payment_term: new FormControl('', [Validators.required]),
      Product_Name: new FormControl('', [Validators.required]),
      Product_Quantity: new FormControl('', [Validators.required]),
      Material_Type: new FormControl('', [Validators.required]),
      Manager_Name: new FormControl('', [Validators.required]),
      Manager_Status: new FormControl(''),
      Engineer_Name: new FormControl(''),
      Engineer_Status: new FormControl(''),
      QC_Name: new FormControl(''),
      QC_Status: new FormControl(''),
      DispatchManager_Name: new FormControl(''),
      Dispatch_Status: new FormControl(''),
      Client_Name: new FormControl('', [Validators.required]),
      WorkOrder_Status: new FormControl('', [Validators.required]),
      Due_Date: new FormControl('')
    });
  }

  ngOnInit(): void {

    this.getadmintoken();
    this.getDispatchManger();
    this.getEmployee();
    this.getQC();
    this.getInventoryManager();
    this.getAccountant();

    this.Allrequirements();
    this.AllPurchaseOrder();
    this.AllQC();
    this.AllEngineer();
    this.AllManager();
    this.AllDispatchManagers();
    this.AllWorkOrder();

    this.AddWorkorderForm.get('Requirement_No')?.valueChanges
      .subscribe(reqNo => {
        if (reqNo) {
          this.autoFillByRequirement(reqNo);
        }
      });
  }

  exportexcel(): void {

    // STEP 4.1 – Create a new array for Excel
    const excelData = this.AllWorkOrderData.map((w: any, index: number) => {
      return {
        'Sr No': index + 1,
        'WO_Number': w.WO_Number,
        'Purchase Number': w.Purchase_Number,
        'Requirement Number': w.Requirement_No,
        'Client Name': w.Client_Name,
        'Address': w.Client_Address,
        'Payment_term': w.Payment_term,
        'Product_Name': w.Product_Name,
        'Product_Quantity': w.Product_Quantity,
        'Design_File': w.Design_File,
        'Material_Type': w.Material_Type,
        'Manager_Name': w.Manager_Name,
        'Manager_Status': w.Manager_Status,
        'Engineer_Name': w.Engineer_Name,
        'QC_Name': w.QC_Name,
        'QC_Status': w.QC_Status,
        'Engineer_Status': w.Engineer_Status,
        'DispatchManager_Name': w.DispatchManager_Name,
        'Dispatch_Status': w.Dispatch_Status,
        'Added_Date': w.Added_Date,
        'Due Date': w.Due_Date,
        'WorkOrder Status': w.WorkOrder_Status
      };
    });

    // STEP 4.2 – Convert JSON data to worksheet
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(excelData);

    // STEP 4.3 – Create workbook
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();

    // STEP 4.4 – Add worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'AllWorkOrderData');

    // STEP 4.5 – Download Excel file
    XLSX.writeFile(workbook, 'Workorder.xlsx');

  }

  // exportexcel(): void {
  //   /* pass here the table id */
  //   let element = document.getElementById('excel-table');
  //   const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

  //   /* generate workbook and add the worksheet */
  //   const wb: XLSX.WorkBook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  //   /* save to file */
  //   XLSX.writeFile(wb, this.fileName);

  // }

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
      if (decoded.Role === 'Engineer') {
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

  autoFillByRequirement(reqNo: string) {
    const req = this.AllPurchaseOrderData.find(
      (r: any) => r.Requirement_No === reqNo
    );
    if (!req) return;
    this.AddWorkorderForm.patchValue({
      Material_Type: req.Material_Type,
      Client_Name: req.Client_Name,
      Purchase_Number: req.Purchase_Number,
      Product_Name: req.Product_Name,
      Product_Quantity: req.Product_Quantity,
      Client_Address: req.Client_Address,
      Rate: req.Rate,
      Subtotal: req.Subtotal,
      CGST_amount: req.CGST_amount,
      SGST_amount: req.SGST_amount,
      Total_Amount: req.Total_Amount,
      Discount_Amount: req.Discount_Amount,
      Payment_term: req.Payment_term
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

  AllWorkOrder() {
    this._rest.AllWorkOrder().subscribe((data: any) => {
      this.AllWorkOrderData = data.data;
    }, (err: any) => {
      console.log(err);
      alert('Error while fetching Work Order data');
    });
  }

  AllEngineer() {
    this._rest.Engineerdata().subscribe((data: any) => {

      this.AllEngineerdata = data.data;
    }, (err: any) => {
      console.log(err);
    });
  }

  AllManager() {
    this._rest.Managerdata().subscribe((data: any) => {

      this.AllManagerdata = data.data;
    }, (err: any) => {
      console.log(err);
    });
  }

  AllQC() {
    this._rest.QCData().subscribe((data: any) => {

      this.AllQCdata = data.data;
    }, (err: any) => {
      console.log(err);
    });
  }

  AllDispatchManagers() {
    this._rest.DispatchManagerData().subscribe((data: any) => {
      this.AllDispatchManagerdata = data.data;
      console.log(data);
    }, (err: any) => {
      console.log(err);
    });
  }

  AddWorkOrderData() {
    this._rest.AddWorkOrder(this.AddWorkorderForm.value).subscribe((data: any) => {
      alert(data.message);
      this.AllWorkOrder();
      this.AddWorkorderForm.reset();
    }, (err: any) => {
      console.log(err);
      alert('Error while adding work Order');
    });
  }

  EditPurchaseOrder(Workorder_Id: any) {
    const selectworkorder = this.AllWorkOrderData.find(
      wo => wo.Workorder_Id === Workorder_Id
    );

    if (!selectworkorder) {
      console.log(`Work Order with ID ${Workorder_Id} not found.`);
      return;
    }
    this.SelectedWorkOrderData = 1;
    // 🔑 Convert Due_Date to yyyy-MM-dd
    const dueDate = selectworkorder.Due_Date
      ? new Date(selectworkorder.Due_Date).toISOString().split('T')[0]
      : '';

    // ✅ Patch everything, but override Due_Date
    this.EditWorkorderForm.patchValue({
      ...selectworkorder,
      Due_Date: dueDate
    });
  }

  // EditPurchaseOrder(Workorder_Id: any) {
  //   const selectworkorder = this.AllWorkOrderData.find(purchaseorder => purchaseorder.Workorder_Id === Workorder_Id)
  //   if (selectworkorder) {
  //     this.SelectedWorkOrderData = 1;
  //     this.EditWorkorderForm.patchValue(selectworkorder);
  //     // 🔑 convert date to YYYY-MM-DD
  //     // const dueDate = data.Due_Date
  //     //   ? new Date(data.Due_Date).toISOString().split('T')[0]
  //     //   : '';

  //     // this.EditWorkorderForm.patchValue({
  //     //   Workorder_Id: Workorder_Id,
  //     //   Client_Name: data.Client_Name,
  //     //   Due_Date: dueDate,
  //     // });
  //   } else {
  //     console.log(`Work Order with ID ${Workorder_Id} not found.`);
  //   }
  // }

  UpdatePurchaseOrder() {
    this._rest.UpdateWorkorder(this.EditWorkorderForm.value).subscribe((data: any) => {
      alert(data.message);
      this.AllWorkOrder();
    }, (err: any) => {
      console.log(err);
      alert('Error while updating Purchase Order');
    });
  }

  DeletePurchaseOrder(Workorder_Id: number) {
    if (confirm("Are you sure to delete this Work Order?")) {
      this._rest.DeleteWorkorder(Workorder_Id).subscribe((data: any) => {
        alert(data.message);
        this.ngOnInit();
      }, (err: any) => {
        console.log(err);
        alert('Error while deleting Work Order');
      });
    }
  }

  WorkorderByStatus() {
    this._rest.WorkorderbyStatus({ WorkOrder_Status: this.WorkOrder_Status }).subscribe((data: any) => {
      if (data && data.data && data.data.length > 0) {
        console.log(data);
        this.AllWorkOrderData = data.data;
      } else {
        // this.AllWorkOrder();
        this.AllWorkOrderData = [];
      }
    });
  }


}