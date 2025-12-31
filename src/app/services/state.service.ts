import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  token = '';
  report : any = undefined;

  constructor(private _router : Router) { }

  decodetoken (){
    this.report = jwtDecode(this.token);
    return this.report;
  }

  checktoken(){
    const token = localStorage.getItem('token');
    if(token){
      this.token = token;
      this.decodetoken();
    }else{
      this._router.navigate(['/login']);
    }
  }

}
