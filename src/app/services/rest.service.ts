import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StateService } from './state.service';
import { tick } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  ApiUrl = 'http://localhost:3000';

  constructor(private _http: HttpClient, private _State: StateService) { }

  Login(data: any) {
    return this._http.post(this.ApiUrl + '/Adminlogin', data);
  }

  AddAdmin(data: any) {
    return this._http.post(this.ApiUrl + '/AddAdmin', data);
  }

  AllAdmin() {
    return this._http.get(this.ApiUrl + '/AllAdminData');
  }

  UpdateAdmin(data: any) {
    return this._http.put(this.ApiUrl + '/UpdateAdmin/' + data.Id, data);
  }

  DeleteAdmin(Id: any) {
    return this._http.delete(this.ApiUrl + '/DeleteAdmin/' + Id);
  }

  Managerdata() {
    return this._http.get(this.ApiUrl + '/AllManagerData');
  }

  Engineerdata() {
    return this._http.get(this.ApiUrl + '/AllEngineerData');
  }

  QCData() {
    return this._http.get(this.ApiUrl + '/AllQCData');
  }
  //AdminAPi Ends

  // Quotation API Start

  AddedQuotation(data: any) {
    return this._http.post(this.ApiUrl + '/Addquotation', data);
  }

  AllQuotation() {
    return this._http.get(this.ApiUrl + '/AllQuotation');
  }

  Updatequotation(data: any) {
    return this._http.put(this.ApiUrl + '/UpdateQuotation/' + data.Quotation_Id, data);
  }

  DeleteQuotation(Quotation_Id: number) {
    return this._http.delete(this.ApiUrl + '/DeleteQuotation/' + Quotation_Id);
  }

  // Quotation API Ends


  //All Purchase Order Data
  AllPurchaseOrder() {
    return this._http.get(this.ApiUrl + '/AllPurchaseOrder');
  }

  AddPurchaseOrder(data: any) {
    return this._http.post(this.ApiUrl + '/AddPurchaseOrder', data);
  }

  EditPurchaseOrder(data: any) {
    return this._http.put(this.ApiUrl + '/UpdatePurchaseOrder/' + data.Id, data);
  }

  DeletePurchaseOrder(Id: number) {
    return this._http.delete(this.ApiUrl + '/DeletePurchaseOrder/' + Id);
  }
  //AllPurchase Order Api Ends

  //AllREquirement Data
  AllRequirement() {
    return this._http.get(this.ApiUrl + '/AllRequirement');
  }

  AddRequirement(formData: any) {
    return this._http.post(this.ApiUrl + '/AddRequirement', formData);
  }

  Requirementdetails(Req_id: number) {
    return this._http.get(this.ApiUrl + '/Requirementdetails/' + Req_id);
  }

  UpdateRequirementss(Req_id: number, formData: any) {
    return this._http.put(this.ApiUrl + '/UpdateRequirement/' + Req_id, formData);
  }

  DeleteRequirement(Req_id: number) {
    return this._http.delete(this.ApiUrl + '/DeleteREquirement/' + Req_id);
  }

  //Machine Api Start
  AddMachine(data: any) {
    return this._http.post(this.ApiUrl + '/AddMachine', data);
  }

  AllMachine() {
    return this._http.get(this.ApiUrl + '/AllMachines');
  }

  UpdateMachine(data: any) {
    return this._http.put(this.ApiUrl + '/UpdateMachine/' + data.Machine_id, data);
  }

  DeleteMachine(Machine_id: any) {
    return this._http.delete(this.ApiUrl + '/DeleteMachine/' + Machine_id);
  }

  MachineById(Machine_id: any) {
    return this._http.get(this.ApiUrl + '/GetMachine/' + Machine_id);
  }

  AvailbleMachine() {
    return this._http.get(this.ApiUrl + '/AvailableMachines');
  }
  //Machine Api End

  //Material API Start

  AddMAterialS(data: any) {
    return this._http.post(this.ApiUrl + '/AddMaterial', data);
  }

  UpdateMaterial(data: any) {
    return this._http.put(this.ApiUrl + '/UpdateMaterial/' + data.Material_id, data);
  }

  AllMaterials() {
    return this._http.get(this.ApiUrl + '/ALLMaterial');
  }

  AllMaterialTypes() {
    return this._http.get(this.ApiUrl + '/Materialbygroup');
  }

  MaterialByid(Material_id: any) {
    return this._http.get(this.ApiUrl + '/MaterialbyId/' + Material_id);
  }

  MaterialByWeights(data: any) {
    return this._http.post(this.ApiUrl + '/MaterialByWeight', data);
  }

  MaterialByName(data: any) {
    return this._http.post(this.ApiUrl + '/MaterialbyMaterialName', data);
  }

  MaterialBySize(data: any) {
    return this._http.post(this.ApiUrl + '/MaterialByMaterialsize', data);
  }

  MaterialByType(data: any) {
    return this._http.post(this.ApiUrl + '/MaterialByMaterialtype', data);
  }

  DeleteMaterial(Material_id: number) {
    return this._http.delete(this.ApiUrl + '/DeleteMaterial/' + Material_id);
  }
  // Material API Ends

  //Work Order API Start
  AddWorkOrder(data: any) {
    return this._http.post(this.ApiUrl + '/AddWorkorder', data);
  }

  AllWorkOrder() {
    return this._http.get(this.ApiUrl + '/AllWorkOrder');
  }

  Allworkorderbyid(Workorder_Id: number) {
    return this._http.get(this.ApiUrl + '/WorkOrderbyid/' + Workorder_Id);
  }

  UpdateWorkorder(data: any) {
    return this._http.put(this.ApiUrl + '/UpdateWorkOrder/' + data.Workorder_Id, data);
  }

  DeleteWorkorder(Workorder_Id: number) {
    return this._http.delete(this.ApiUrl + '/DeleteWorkOrder/' + Workorder_Id);
  }

  //Work Order API Ends

  //WorkorderClose API Start
  AddWorkorderclose(data:any){
    return this._http.post(this.ApiUrl + '/AddWorkorderClose', data);
  }

  Updateworkorderclose(data:any){
    return this._http.put(this.ApiUrl + '/UpdateWorkorderClose/' + data.WorkClose_Id, data);
  }

  Allworkorderclose(){
    return this._http.get(this.ApiUrl + '/AllWorkorderClose');
  }

  AllUpdateWorkOrderClosebyid(WorkClose_Id: any){
    return this._http.get(this.ApiUrl + '/Allworkorderclose/'+ WorkClose_Id);
  }

  DeleteWorkorderClose(WorkClose_Id: any){
    return this._http.delete(this.ApiUrl + '/DeleteWorkorderclose/'+ WorkClose_Id);
  }

  //WorkorderClose API Ends 


}
