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

const routes: Routes = [
  { path: ' ', redirectTo: 'Dashboard', pathMatch: "full" },
  { path: 'Dashboard', component: DashboardComponent },
  // { path: 'login', component: LoginComponent },
  {
    path: 'login', component: LoginComponent, children: [
      { path: '', redirectTo: 'Home', pathMatch: 'full' },
      // { path: 'dashboard', component: DashboardComponent },
      { path: 'Admin', component: AdmindashboardComponent, title: 'Admin pages' },
      { path: 'Employee', component: EmployeedashboardComponent },
      { path: 'Machine', component: MachineComponent },
      { path: 'Material', component: MaterialComponent },
      { path: 'DeliveryChallan', component: DeliverychallanComponent },
      { path: 'Quatation', component: QuatationComponent },
      { path: 'WorkOrder', component: WorkorderComponent },
      { path: 'PurchaseOrder', component: PurchaseorderComponent },
      { path: '**', redirectTo: 'Home' }
    ]
  },
  // { path: '**', redirectTo: 'login' },
  { path: '**', redirectTo: 'Dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
