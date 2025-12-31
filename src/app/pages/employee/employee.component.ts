import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  AllData: any[] = [];
  AddDataForm: FormGroup;
  EditDataForm: FormGroup;

  Selectedemployee: any = null;

  constructor(private _rest: RestService, private _State: StateService, private _router: Router) {

    this.AddDataForm = new FormGroup({
      Name: new FormControl('', [Validators.required]),
      PhoneNo: new FormControl('', [Validators.required]),
      Username: new FormControl('', [Validators.required]),
      Email: new FormControl('', [Validators.required, Validators.email]),
      Address: new FormControl('', [Validators.required]),
      Role: new FormControl('', [Validators.required]),
    });

    this.EditDataForm = new FormGroup({
      Id: new FormControl(''),
      Name: new FormControl('', [Validators.required]),
      PhoneNo: new FormControl('', [Validators.required]),
      Username: new FormControl('', [Validators.required]),
      Password: new FormControl('', [Validators.required]),
      Email: new FormControl('', [Validators.required, Validators.email]),
      Address: new FormControl('', [Validators.required]),
      Role: new FormControl('', [Validators.required]),
      Status: new FormControl('', [Validators.required]),
    });

  }

  ngOnInit(): void {
    this.GetAllAdmin();
  }

  GetAllAdmin() {
    this._rest.AllAdmin().subscribe((res: any) => {
      this.AllData = res.data;
    }, (err: any) => {
      console.log(err);
    });
  }

  AddAdmins() {
    this._rest.AddAdmin(this.AddDataForm.value).subscribe((res: any) => {
      alert(res.message);
      this.GetAllAdmin();
      this.AddDataForm.reset();
    });
  }

  editAdmin(Id: any) {
    const selectadmin = this.AllData.find(Admin => Admin.Id === Id)
    if (selectadmin) {
      this.Selectedemployee = 1;
      this.EditDataForm.patchValue(selectadmin);
    } else {
      console.log(`Admin with ID ${Id} not found.`);
    }
  }

  updateStatus(event: any): void {
    this.EditDataForm.patchValue({
      Status: event.target.checked ? 'Active' : 'Inactive'
    });
  }


  UpdateAdmin() {
    this._rest.UpdateAdmin(this.EditDataForm.value).subscribe((res: any) => {
      alert(res.message);
      this.GetAllAdmin();
      this.EditDataForm.reset();
    }, (err: any) => {
      console.log(err);
    });
  }

  DeleteAdmin(Id: any) {
    if (!confirm("Are you sure to delete this Admin?")) {
      this._rest.DeleteAdmin(Id).subscribe((res: any) => {
        alert(res.message);
        this.GetAllAdmin();
      }, (err: any) => {
        console.log(err);
      });
    }
  }

}