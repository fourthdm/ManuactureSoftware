import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-quatation',
  templateUrl: './quatation.component.html',
  styleUrls: ['./quatation.component.css']
})
export class QuatationComponent implements OnInit {

  AllRequirementData: any[] = [];
  Quotations: any[] = [];

  AddQuotationform: FormGroup;
  EditquotationForm: FormGroup;

  SelectedQuotation: any = null;

  constructor(private _rest: RestService, private fb: FormBuilder, private _router: Router) {
    this.AddQuotationform = new FormGroup({
      Requirement_No: new FormControl('', [Validators.required]),
      Material_Type: new FormControl('', [Validators.required]),
      Client_Name: new FormControl('', [Validators.required]),
      Product_Name: new FormControl('', [Validators.required]),
      Product_Quantity: new FormControl('', [Validators.required]),
      Rate: new FormControl('', [Validators.required]),
      Manufacturing_Cost: new FormControl('', [Validators.required]),
      Material_Cost: new FormControl('', [Validators.required]),
      Dispatch_Cost: new FormControl('', [Validators.required]),
      Discount_Amount: new FormControl('', [Validators.required]),
      Payment_term: new FormControl('', [Validators.required]),
      Shipping_Method: new FormControl('', [Validators.required]),
      HSN_Code: new FormControl('', [Validators.required]),
      Client_Address: new FormControl('', [Validators.required]),
      Validity_Date: new FormControl(''),
      Quotation_Status: new FormControl('', [Validators.required])
    });

    this.EditquotationForm = new FormGroup({
      Quotation_Id: new FormControl(''),
      Quotation_Number: new FormControl(''),
      Requirement_No: new FormControl('', [Validators.required]),
      Material_Type: new FormControl('', [Validators.required]),
      Client_Name: new FormControl('', [Validators.required]),
      Product_Name: new FormControl('', [Validators.required]),
      Product_Quantity: new FormControl('', [Validators.required]),
      Rate: new FormControl('', [Validators.required]),
      Manufacturing_Cost: new FormControl('', [Validators.required]),
      Material_Cost: new FormControl('', [Validators.required]),
      Dispatch_Cost: new FormControl('', [Validators.required]),
      Discount_Amount: new FormControl('', [Validators.required]),
      Payment_term: new FormControl('', [Validators.required]),
      Shipping_Method: new FormControl('', [Validators.required]),
      HSN_Code: new FormControl('', [Validators.required]),
      Address: new FormControl('', [Validators.required]),
      Validity_Date: new FormControl(''),
      Quotation_Status: new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void {
    this.Allrequirements();
    this.ALLQuotation();
    this.AddQuotationform.get('Requirement_No')?.valueChanges
      .subscribe(reqNo => {
        if (reqNo) {
          this.autoFillByRequirement(reqNo);
        }
      });
  }

  autoFillByRequirement(reqNo: string) {
    const req = this.AllRequirementData.find(
      (r: any) => r.Requirement_No === reqNo
    );

    if (!req) return;

    this.AddQuotationform.patchValue({
      Material_Type: req.Material_Type,
      Client_Name: req.Client_Name,
      Product_Name: req.Product_Name,
      Product_Quantity: req.Product_Quantity,
      Client_Address: req.Client_Address,
      Manufacturing_Cost: req.Manufacturing_Cost,
      Material_Cost: req.Material_Cost,
      Dispatch_Cost: req.Dispatch_Cost,
      Rate: req.Rate
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

  ALLQuotation() {
    this._rest.AllQuotation().subscribe((data: any) => {
      console.log(data);
      this.Quotations = data.data;
    }, (err: any) => {
      console.log(err);
    });
  }

  AddQuotations() {
    this._rest.AddedQuotation(this.AddQuotationform.value).subscribe((data: any) => {
      console.log(data);
      alert(data.message);
      this.Quotations = data.data;
      this.ngOnInit();
      this.AddQuotationform.reset();
    }, (err: any) => {
      console.log(err);
    });
  }

  DeleteQuotation(Quotation_Id: number) {
    if (confirm('Are You sure to delete a quotation.')) {
      this._rest.DeleteQuotation(Quotation_Id).subscribe((data: any) => {
        console.log(data);
        this.ngOnInit();
      }, (err: any) => {
        console.log(err);
      });
    }
  }

  editQuotation(Quotation_Id: any) {
    const selectQuotation = this.Quotations.find(q => q.Quotation_Id === Quotation_Id);
    if (selectQuotation) {
      this.SelectedQuotation = 1;
      this.EditquotationForm.patchValue(selectQuotation);
    }
  }

  UpdatedQuotation() {
    this._rest.Updatequotation(this.EditquotationForm.value).subscribe((data: any) => {
      console.log(data);
      this.ngOnInit();
      this.EditquotationForm.reset();
    }, (err: any) => {
      console.log(err);
    });
  }

  printPdf(Quotation_Id: any) {
    this._rest.GenerateQuotation(Quotation_Id)
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
