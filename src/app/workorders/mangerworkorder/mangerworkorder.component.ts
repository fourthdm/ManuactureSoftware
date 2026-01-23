import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RestService } from 'src/app/services/rest.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-mangerworkorder',
  templateUrl: './mangerworkorder.component.html',
  styleUrls: ['./mangerworkorder.component.css']
})
export class MangerworkorderComponent implements OnInit {

  AllManagerorders: any[] = [];
  pro: any;

  AllWorkOrderData: any[] = [];
  AllPurchaseOrderData: any[] = [];
  AllRequirementData: any[] = [];

  AllManagerdata: any[] = [];
  AllEngineerdata: any[] = [];
  AllQCdata: any[] = [];

  AddWorkorderForm: FormGroup;
  EditWorkorderForm: FormGroup;

  SelectedWorkOrderData: any;

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
      // Requirement_No: new FormControl('', [Validators.required]),
      // Purchase_Number: new FormControl('', [Validators.required]),
      // Payment_term: new FormControl('', [Validators.required]),
      // Product_Name: new FormControl('', [Validators.required]),
      // Product_Quantity: new FormControl('', [Validators.required]),
      Material_Type: new FormControl('', [Validators.required]),
      Manager_Name: new FormControl('', [Validators.required]),
      Manager_Status: new FormControl(''),
      Engineer_Name: new FormControl(''),
      QC_Name: new FormControl(''),
      DispatchManager_Name: new FormControl(''),
      // Client_Name: new FormControl('', [Validators.required]),
      WorkOrder_Status: new FormControl('', [Validators.required]),
      Due_Date: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.Allworkorderss();
    this.Allrequirements();
    this.AllPurchaseOrder();
    this.AllQC();
    this.AllEngineer();
    this.AllManager();
    this.AllWorkOrder();

    this.AddWorkorderForm.get('Requirement_No')?.valueChanges
      .subscribe(reqNo => {
        if (reqNo) {
          this.autoFillByRequirement(reqNo);
        }
      });
  }

  Allworkorderss() {
    this._rest.WorkorderforManager().subscribe((data: any) => {
      console.log(data);
      this.AllManagerorders = data.data;
    }, (err: any) => {
      console.log(err);
    });
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

  AddWorkOrderData() {
    this._rest.AddWorkOrder(this.AddWorkorderForm.value).subscribe((data: any) => {
      alert(data.message);
      this.AllWorkOrder();
      this.AddWorkorderForm.reset();
    }, (err: any) => {
      console.log(err);
      alert('Error while Adding Work Order');
    });
  }

  EditPurchaseOrder(Workorder_Id: any) {
    const selectworkorder = this.AllWorkOrderData.find(purchaseorder => purchaseorder.Workorder_Id === Workorder_Id)
    if (selectworkorder) {
      this.SelectedWorkOrderData = 1;
      this.EditWorkorderForm.patchValue(selectworkorder);
    } else {
      console.log(`Work Order with ID ${Workorder_Id} not found.`);
    }
  }

  UpdatePurchaseOrder() {
    this._rest.UpdateWorkorderbymanager(this.EditWorkorderForm.value).subscribe((data: any) => {
      alert(data.message);
      this.AllWorkOrder();
    }, (err: any) => {
      console.log(err);
      alert('Error while updating Work Order');
    });
  }

  DeletePurchaseOrder(Workorder_Id: number) {
    if (confirm("Are you sure to delete this Work Order?")) {
      this._rest.DeleteWorkorder(Workorder_Id).subscribe((data: any) => {
        alert(data.message);
        this.ngOnInit();
      }, (err: any) => {
        console.log(err);
        alert('Error while Deleting Work Order');
      });
    }
  }

  downloadFromUrl(fileUrl: string) {
    const fileName = fileUrl.split('/').pop();   // extract file name

    const a = document.createElement('a');
    a.href = fileUrl;
    a.download = fileName ?? 'file';   // force download
    a.target = "_blank";
    a.click();
  }

  // loadWorkOrders() {
  //   this._rest.AllWorkOrder().subscribe((workorders: any) => {
  //     workorders.forEach((wo:any) => {
  //       this._rest
  //         .createNotification(wo.Workorder_Id)
  //         .subscribe();
  //     });
  //   });
  // }

}