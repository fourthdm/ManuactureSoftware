import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './common/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AdmindashboardComponent } from './pages/admindashboard/admindashboard.component';
import { EmployeedashboardComponent } from './pages/employeedashboard/employeedashboard.component';
import { MachineComponent } from './pages/machine/machine.component';
import { MaterialComponent } from './pages/material/material.component';
import { DeliverychallanComponent } from './pages/deliverychallan/deliverychallan.component';
import { PurchaseorderComponent } from './pages/purchaseorder/purchaseorder.component';
import { WorkorderComponent } from './pages/workorder/workorder.component';
import { QuatationComponent } from './pages/quatation/quatation.component';
import { MangerdashboardComponent } from './pages/mangerdashboard/mangerdashboard.component';
import { AccountantdashboardComponent } from './pages/accountantdashboard/accountantdashboard.component';
import { QcdashboardComponent } from './pages/qcdashboard/qcdashboard.component';
import { DispatchdashboardComponent } from './pages/dispatchdashboard/dispatchdashboard.component';
import { EmployeeComponent } from './pages/employee/employee.component';
import { WorkcloseComponent } from './pages/workclose/workclose.component';
import { RequirementComponent } from './pages/requirement/requirement.component';
import { ViewrequirementComponent } from './pages/viewrequirement/viewrequirement.component';
import { ViewpurchaseorderComponent } from './pages/viewpurchaseorder/viewpurchaseorder.component';
import { ViewquotationComponent } from './pages/viewquotation/viewquotation.component';
import { BillComponent } from './pages/bill/bill.component';
import { ViewworkorderComponent } from './pages/viewworkorder/viewworkorder.component';
import { ViewbillComponent } from './pages/viewbill/viewbill.component';
import { MangerworkorderComponent } from './workorders/mangerworkorder/mangerworkorder.component';
import { DispatchmanagerworkorderComponent } from './workorders/dispatchmanagerworkorder/dispatchmanagerworkorder.component';
import { QcworkorderComponent } from './workorders/qcworkorder/qcworkorder.component';
import { EngineerworkorderComponent } from './workorders/engineerworkorder/engineerworkorder.component';
import { EmployeedetailsComponent } from './common/employeedetails/employeedetails.component';
import { ChallandetailsComponent } from './pages/challandetails/challandetails.component';

const routes: Routes = [

  { path: '', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'AdminDashboard', component: AdmindashboardComponent, title: 'Admin pages', children: [
      { path: '', redirectTo: 'AdminDashboard', pathMatch: 'full' },
      { path: 'Employee', component: EmployeeComponent },
      { path: 'Machine', component: MachineComponent },
      { path: 'Material', component: MaterialComponent },
      { path: 'DeliveryChallan', component: DeliverychallanComponent },
      { path: 'Quatation', component: QuatationComponent },
      { path: 'WorkOrder', component: WorkorderComponent },
      { path: 'Bill', component: BillComponent },
      { path: 'WorkOrderClose', component: WorkcloseComponent },
      { path: 'PurchaseOrder', component: PurchaseorderComponent },
      { path: 'Requirement', component: RequirementComponent },
      { path: 'RequirementDetails/:Req_id', component: ViewrequirementComponent },
      { path: 'QuotationDetails/:Quotation_Id', component: ViewquotationComponent },
      { path: 'PurchaseOrderDetails/:Id', component: ViewpurchaseorderComponent },
      { path: 'WorkorderDetails/:Workorder_Id', component: ViewworkorderComponent },
      { path: 'BillDetails/:Bill_Id', component: ViewbillComponent },
      { path: 'ChallanDetails/:Challan_Id', component: ChallandetailsComponent },
      { path: '**', redirectTo: 'AdminDashboard' }
    ]
  },
  {
    path: 'EmployeeDashboard', component: EmployeedashboardComponent, children: [
      { path: '', redirectTo: 'WorkOrder', pathMatch: 'full' },
      { path: 'WorkOrder', component: EngineerworkorderComponent },
      { path: 'WorkorderDetails/:Workorder_Id', component: ViewworkorderComponent },
      { path: 'WorkOrderClose', component: WorkcloseComponent },
      { path: '**', redirectTo: 'EmployeeDashboard' }
    ]
  },
  {
    path: 'QCDashboard', component: QcdashboardComponent, children: [
      { path: '', redirectTo: 'WorkOrder', pathMatch: 'full' },
      { path: 'WorkOrder', component: QcworkorderComponent },
      { path: 'WorkorderDetails/:Workorder_Id', component: ViewworkorderComponent },
      { path: 'WorkOrderClose', component: WorkcloseComponent },
      { path: '**', redirectTo: 'QCDashboard' }
    ]
  },
  {
    path: 'AccountantDashboard', component: AccountantdashboardComponent, children: [
      { path: '', redirectTo: 'AccountantDashboard', pathMatch: 'full' },
      { path: 'Machine', component: MachineComponent },
      { path: 'Material', component: MaterialComponent },
      { path: 'DeliveryChallan', component: DeliverychallanComponent },
      { path: 'ChallanDetails/:Challan_Id', component: ChallandetailsComponent },
      { path: 'Quatation', component: QuatationComponent },
      { path: 'WorkOrder', component: WorkorderComponent },
      { path: 'Bill', component: BillComponent },
      { path: 'BillDetails/:Bill_Id', component: ViewbillComponent },
      { path: 'WorkOrderClose', component: WorkcloseComponent },
      { path: 'PurchaseOrder', component: PurchaseorderComponent },
      { path: '**', redirectTo: 'AccountantDashboard' }
    ]
  },
  {
    path: 'ManagerDashboard', component: MangerdashboardComponent, children: [
      { path: '', redirectTo: 'WorkOrder', pathMatch: 'full' },
      { path: 'Machine', component: MachineComponent },
      { path: 'Material', component: MaterialComponent },
      { path: 'DeliveryChallan', component: DeliverychallanComponent },
      { path: 'ChallanDetails/:Challan_Id', component: ChallandetailsComponent },
      { path: 'Quatation', component: QuatationComponent },
      { path: 'WorkOrder', component: MangerworkorderComponent },
      { path: 'WorkorderDetails/:Workorder_Id', component: ViewworkorderComponent },
      { path: 'WorkOrderClose', component: WorkcloseComponent },
      { path: 'PurchaseOrder', component: PurchaseorderComponent },
      { path: '**', redirectTo: 'ManagerDashboard' }
    ]
  },
  {
    path: 'DispatchDashboard', component: DispatchdashboardComponent, children: [
      { path: '', redirectTo: 'DispatchDashboard', pathMatch: 'full' },
      { path: 'Machine', component: MachineComponent },
      { path: 'Material', component: MaterialComponent },
      { path: 'DeliveryChallan', component: DeliverychallanComponent },
      { path: 'ChallanDetails/:Challan_Id', component: ChallandetailsComponent },
      // { path: 'Quatation', component: QuatationComponent },
      { path: 'WorkOrder', component: DispatchmanagerworkorderComponent },
      { path: 'WorkOrderClose', component: WorkcloseComponent },
      // { path: 'PurchaseOrder', component: PurchaseorderComponent },
      { path: '**', redirectTo: 'DispatchDashboard' }
    ]
  },


  // { path: 'Machine', component: MachineComponent },
  // { path: 'Material', component: MaterialComponent },
  // { path: 'DeliveryChallan', component: DeliverychallanComponent },
  // { path: 'Quatation', component: QuatationComponent },
  // { path: 'WorkOrder', component: WorkorderComponent },
  // { path: 'WorkOrderClose', component: WorkcloseComponent },
  // { path: 'PurchaseOrder', component: PurchaseorderComponent },
  { path: '**', redirectTo: '' }

  // { path: ' ', redirectTo: 'Dashboard', pathMatch: "full" },
  // { path: 'Dashboard', component: DashboardComponent },
  // // { path: 'login', component: LoginComponent },
  // { path: 'login', component: LoginComponent, children: [
  //     { path: '', redirectTo: 'Home', pathMatch: 'full' },
  //     // { path: 'dashboard', component: DashboardComponent },
  //     { path: 'Admin', component: AdmindashboardComponent, title: 'Admin pages' },
  //     { path: 'Employee', component: EmployeedashboardComponent },
  //     { path: 'Machine', component: MachineComponent },
  //     { path: 'Material', component: MaterialComponent },
  //     { path: 'DeliveryChallan', component: DeliverychallanComponent },
  //     { path: 'Quatation', component: QuatationComponent },
  //     { path: 'WorkOrder', component: WorkorderComponent },
  //     { path: 'PurchaseOrder', component: PurchaseorderComponent },
  //     { path: '**', redirectTo: 'Home' }
  //   ]
  // },
  // // { path: '**', redirectTo: 'login' },
  // { path: '**', redirectTo: 'Dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
