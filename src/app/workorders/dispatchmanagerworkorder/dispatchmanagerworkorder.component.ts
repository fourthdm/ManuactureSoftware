import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { RestService } from 'src/app/services/rest.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-dispatchmanagerworkorder',
  templateUrl: './dispatchmanagerworkorder.component.html',
  styleUrls: ['./dispatchmanagerworkorder.component.css']
})
export class DispatchmanagerworkorderComponent implements OnInit {
  AllDispatchWorkorders: any[] = [];
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

  constructor(private _rest: RestService, private _state: StateService, private sanitizer: DomSanitizer) {
    this.AddWorkorderForm = new FormGroup({
      Dispatch_Status: new FormControl('')
    });

    this.EditWorkorderForm = new FormGroup({
      Workorder_Id: new FormControl(''),
      Dispatch_Status: new FormControl('')
    })
  }

  ngOnInit(): void {
    this.AllDisapatchmanagerworkorder();
  }

  AllDisapatchmanagerworkorder() {
    this._rest.Workorderfordispatchmanager().subscribe((data: any) => {
      console.log(data);
      this.AllDispatchWorkorders = data.data;
    }, (err: any) => {
      console.log(err);
    });
  }

  AddWorkOrderData() {
    this._rest.AddWorkOrder(this.AddWorkorderForm.value).subscribe((data: any) => {
      alert(data.message);
      this.AllDisapatchmanagerworkorder();
      this.AddWorkorderForm.reset();
    }, (err: any) => {
      console.log(err);
      alert('Error while adding work Order');
    });
  }

  EditPurchaseOrder(Workorder_Id: any) {
    const selectworkorder = this.AllDispatchWorkorders.find(purchaseorder => purchaseorder.Workorder_Id === Workorder_Id)
    if (selectworkorder) {
      this.SelectedWorkOrderData = 1;
      this.EditWorkorderForm.patchValue(selectworkorder);
    } else {
      console.log(`Workorder Order with ID ${Workorder_Id} not found.`);
    }
  }

  UpdatePurchaseOrder() {
    this._rest.UpdateDispatchManagerStatus(this.EditWorkorderForm.value).subscribe((data: any) => {
      alert(data.message);
      this.AllDisapatchmanagerworkorder();
      this.EditWorkorderForm.reset();
    }, (err: any) => {
      console.log(err);
      alert('Error while Updating Engineer Status');
    });
  }

  getsafeurl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  downloadFromUrl(fileUrl: string) {
    const fileName = fileUrl.split('/').pop();   // extract file name

    const a = document.createElement('a');
    a.href = fileUrl;
    a.download = fileName ?? 'file';   // force download
    a.target = "_blank";
    a.click();
  }

}
