import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-workorder',
  templateUrl: './workorder.component.html',
  styleUrls: ['./workorder.component.css']
})
export class WorkorderComponent implements OnInit {
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
      Days_of_Payment: new FormControl('', [Validators.required]),
      Product_Name: new FormControl('', [Validators.required]),
      Product_Quantity: new FormControl('', [Validators.required]),
      Material_Type: new FormControl('', [Validators.required]),
      Manager_Name: new FormControl('', [Validators.required]),
      Engineer_Name: new FormControl(''),
      QC_Name: new FormControl(''),
      Client_Name: new FormControl('', [Validators.required]),
      WorkOrder_Status: new FormControl('', [Validators.required])
    });

    this.EditWorkorderForm = new FormGroup({
      Workorder_Id: new FormControl(''),
      Requirement_No: new FormControl('', [Validators.required]),
      Purchase_Number: new FormControl('', [Validators.required]),
      Days_of_Payment: new FormControl('', [Validators.required]),
      Product_Name: new FormControl('', [Validators.required]),
      Product_Quantity: new FormControl('', [Validators.required]),
      Material_Type: new FormControl('', [Validators.required]),
      Manager_Name: new FormControl('', [Validators.required]),
      Engineer_Name: new FormControl(''),
      QC_Name: new FormControl(''),
      Client_Name: new FormControl('', [Validators.required]),
      WorkOrder_Status: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    this.Allrequirements();
    this.AllPurchaseOrder();
    this.AllQC();
    this.AllEngineer();
    this.AllManager();
    this.AllWorkOrder();
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
      alert('Error while adding work Order');
    });
  }

  EditPurchaseOrder(Workorder_Id: any) {
    const selectworkorder = this.AllWorkOrderData.find(purchaseorder => purchaseorder.Workorder_Id === Workorder_Id)
    if (selectworkorder) {
      this.SelectedWorkOrderData = 1;
      this.EditWorkorderForm.patchValue(selectworkorder);
    } else {
      console.log(`Purchase Order with ID ${Workorder_Id} not found.`);
    }
  }

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
        alert('Error while deleting Purchase Order');
      });
    }
  }


}
