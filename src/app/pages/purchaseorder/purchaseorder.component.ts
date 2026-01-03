import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  AddpurchaseorderForm: FormGroup;
  EditpurchaseorderForm: FormGroup;

  SelectedPurchaseOrderData: any;

  constructor(private _rest: RestService, private _state: StateService) {
    this.AddpurchaseorderForm = new FormGroup({
      Requirement_No: new FormControl('', [Validators.required]),
      Client_Name: new FormControl('', [Validators.required]),
      Material_Type_Used: new FormControl('', [Validators.required]),
      Quantity: new FormControl('', [Validators.required]),
      Purchase_Address: new FormControl('', [Validators.required]),
      Payment_Method: new FormControl('', [Validators.required]),
      Status: new FormControl('', [Validators.required]),

    });

    this.EditpurchaseorderForm = new FormGroup({
      Id: new FormControl(''),
      Requirement_No: new FormControl('', [Validators.required]),
      Client_Name: new FormControl('', [Validators.required]),
      Material_Type_Used: new FormControl('', [Validators.required]),
      Quantity: new FormControl('', [Validators.required]),
      Purchase_Address: new FormControl('', [Validators.required]),
      Payment_Method: new FormControl('', [Validators.required]),
      Status: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.Allrequirements();
    this.AllPurchaseOrder();

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


  EditPurchaseOrder(Id: number) {
    // this._rest.EditPurchaseOrder(this.EditpurchaseorderForm.value).subscribe((data: any) => {
    //   alert(data.message);
    //   this.AllPurchaseOrder();
    //   this.EditpurchaseorderForm.reset();
    // }, (err: any) => {
    //   console.log(err);
    //   alert('Error while editing Purchase Order');
    // });
  }

  UpdatePurchaseOrder() { }

  DeletePurchaseOrder(Id: number) {
    // this._rest.DeletePurchaseOrder(Id).subscribe((data: any) => {
    //   alert(data.message);
    //   this.AllPurchaseOrder();
    // }, (err: any) => {
    //   console.log(err);
    //   alert('Error while deleting Purchase Order');
    // });
  }
}