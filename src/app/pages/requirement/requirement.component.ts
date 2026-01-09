import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-requirement',
  templateUrl: './requirement.component.html',
  styleUrls: ['./requirement.component.css']
})
export class RequirementComponent implements OnInit {

  AllRequirementData: any[] = [];
  Requirementform: FormGroup;
  EditRequirementform: FormGroup;

  SelectedRequirementData: any;

  selectedFile: File | null = null;

  constructor(private _rest: RestService, private _router: Router, private fb: FormBuilder) {
    this.Requirementform = this.fb.group({
      Product_Name: new FormControl('', [Validators.required]),
      Client_Name: new FormControl('', [Validators.required]),
      Client_Address: new FormControl('', [Validators.required]),
      Client_PhoneNo: new FormControl('', [Validators.required]),
      Client_Email: new FormControl('', [Validators.required, Validators.email]),
      Product_Quantity: new FormControl('', [Validators.required]),
      Design_File: new FormControl(''),
      Status: new FormControl('', [Validators.required]),
    });

    this.EditRequirementform = this.fb.group({
      Req_id: new FormControl(''),
      Product_Name: new FormControl('', [Validators.required]),
      Client_Name: new FormControl('', [Validators.required]),
      Client_Address: new FormControl('', [Validators.required]),
      Client_PhoneNo: new FormControl('', [Validators.required]),
      Client_Email: new FormControl('', [Validators.required, Validators.email]),
      Product_Quantity: new FormControl('', [Validators.required]),
      Design_File: new FormControl(''),
      Status: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.Allrequirements();
  }

  // 📁 Handle file selection
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  // 🚀 Submit form
  onSubmit() {
    if (this.Requirementform.invalid) {
      alert('Please fill in all required fields!');
      return;
    }

    const formData = new FormData();

    // Append all form values
    Object.keys(this.Requirementform.controls).forEach(key => {
      formData.append(key, this.Requirementform.get(key)?.value);
    });

    // Append file if selected
    if (this.selectedFile) {
      formData.append('Design_File', this.selectedFile);
    }

    // ✅ Send POST request to Node API
    this._rest.AddRequirement(formData).subscribe({
      next: (response: any) => {
        if (response.success) {
          // alert('✅ Job added successfully and machine assigned!');
          this.Requirementform.reset();
          this.AllRequirementData = response.data
          this.ngOnInit();
        } else {
          alert('⚠️ ' + response.message);
        }
      },
      error: (err) => {
        console.error(err);
        alert('❌ Error while adding job: ' + (err.error?.message || err.message));
      }
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

  DeleteRequirement(Req_id: any) {
    if (confirm('Are You Want to Delete this Requirement.')) {
      this._rest.DeleteRequirement(Req_id).subscribe((data: any) => {
        console.log(data);
        this.ngOnInit();
      }, (err: any) => {
        console.log(err);
      });
    }
  }

  editRequirement(Req_id: number) {
    const requirements = this.AllRequirementData.find(R => R.Req_id === Req_id);
    if (requirements) {
      this.SelectedRequirementData = 1;
      this.EditRequirementform.patchValue(requirements);
    }
  }

  onFileChange(event: any, fieldName: string): void {
    const file = event.target.files[0];
    if (file) {
      this.EditRequirementform.patchValue({ [fieldName]: file });
    }
  }

  UpdateRequirements() {
    const formData = new FormData();
    Object.keys(this.EditRequirementform.controls).forEach(key => {
      formData.append(key, this.EditRequirementform.get(key)?.value);
    });
    // Update form data 
    this._rest.UpdateRequirementss(this.EditRequirementform.value.Req_id, formData).subscribe(
      response => {
        console.log('Update success', response);
        this.EditRequirementform.reset();
        this.ngOnInit();
      },
      error => {
        console.error('Update error', error);
      });
  }

}