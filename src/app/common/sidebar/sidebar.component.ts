import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  isAdmin: boolean = false;
  isDesigner: boolean = false;
  isEmployee: boolean = false;
  isQC: boolean = false;
  isManager: boolean = false;
  isAccountant: boolean = false;

  constructor(private _router: Router) { }

  ngOnInit() {
    this.getadmintoken();
    this.getDesigner();
    this.getEmployee();
    this.getQC();
    this.getInventoryManager();
  }

  Logout() {
    localStorage.removeItem('token');
    this._router.navigate(['login']);
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

  getDesigner() {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded: any = jwtDecode(token);
      if (decoded.Role === 'Designer') {
        this.isDesigner = true;
      } else {
        this.isDesigner = false;
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


}
