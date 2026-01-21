import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '../services/rest.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-employeedashboardnavbar',
  templateUrl: './employeedashboardnavbar.component.html',
  styleUrls: ['./employeedashboardnavbar.component.css']
})
export class EmployeedashboardnavbarComponent implements OnInit {
  employeedata: any;

  constructor(private _rest: RestService, private _activatedroute: ActivatedRoute, private _router:Router) { }

  ngOnInit(): void {

    const token = localStorage.getItem('token');
    if (token) {
      this.employeedata = jwtDecode(token);
    }
  }

  Logout() {
    localStorage.removeItem('token');
    this._router.navigate(['login']);
  }


}
