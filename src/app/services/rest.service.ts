import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StateService } from './state.service';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  ApiUrl = 'http://localhost:3000';

  constructor(private _http: HttpClient, private _State: StateService) { }

  Login(data: any){
    return this._http.post(this.ApiUrl + '/Adminlogin', data);
  }

  AddAdmin(data:any){
    return this._http.post(this.ApiUrl + '/AddAdmin', data);
  }

  AllAdmin(){
    return this._http.get(this.ApiUrl + '/AllAdminData');
  }

  UpdateAdmin(data:any){
    return this._http.put(this.ApiUrl + '/UpdateAdmin/' + data.Id, data);
  }

  DeleteAdmin(Id:any){
    return this._http.delete(this.ApiUrl + '/DeleteAdmin/' + Id);
  }

}
