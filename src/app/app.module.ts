import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './common/navbar/navbar.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { FooterComponent } from './common/footer/footer.component';
import { LoginComponent } from './common/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MaterialComponent } from './pages/material/material.component';
import { MachineComponent } from './pages/machine/machine.component';
import { PurchaseorderComponent } from './pages/purchaseorder/purchaseorder.component';
import { WorkorderComponent } from './pages/workorder/workorder.component';
import { WorkcloseComponent } from './pages/workclose/workclose.component';
import { MangerdashboardComponent } from './pages/mangerdashboard/mangerdashboard.component';
import { EmployeedashboardComponent } from './pages/employeedashboard/employeedashboard.component';
import { AccountantdashboardComponent } from './pages/accountantdashboard/accountantdashboard.component';
import { AdmindashboardComponent } from './pages/admindashboard/admindashboard.component';
import { DeliverychallanComponent } from './pages/deliverychallan/deliverychallan.component';
import { RequirementComponent } from './pages/requirement/requirement.component';
import { QuatationComponent } from './pages/quatation/quatation.component';
import { EmployeeComponent } from './pages/employee/employee.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { QcdashboardComponent } from './pages/qcdashboard/qcdashboard.component';
import { DispatchdashboardComponent } from './pages/dispatchdashboard/dispatchdashboard.component';
import { SafeurlpipePipe } from './safeurlpipe.pipe';
import { ViewrequirementComponent } from './pages/viewrequirement/viewrequirement.component';
import { ViewpurchaseorderComponent } from './pages/viewpurchaseorder/viewpurchaseorder.component';
import { ViewquotationComponent } from './pages/viewquotation/viewquotation.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { BillComponent } from './pages/bill/bill.component';
import { ViewbillComponent } from './pages/viewbill/viewbill.component';
import { ViewworkorderComponent } from './pages/viewworkorder/viewworkorder.component';
import { MangerworkorderComponent } from './workorders/mangerworkorder/mangerworkorder.component';
import { EngineerworkorderComponent } from './workorders/engineerworkorder/engineerworkorder.component';
import { QcworkorderComponent } from './workorders/qcworkorder/qcworkorder.component';
import { DispatchmanagerworkorderComponent } from './workorders/dispatchmanagerworkorder/dispatchmanagerworkorder.component';
import { EmployeedashboardnavbarComponent } from './employeedashboardnavbar/employeedashboardnavbar.component';
import { EmployeedetailsComponent } from './common/employeedetails/employeedetails.component';
import { ChallandetailsComponent } from './pages/challandetails/challandetails.component';
import { ClientsComponent } from './pages/clients/clients.component';
// import { PdfViewerModule } from 'ng2-pdf-viewer';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    LoginComponent,
    HomeComponent,
    DashboardComponent,
    MaterialComponent,
    MachineComponent,
    PurchaseorderComponent,
    WorkorderComponent,
    WorkcloseComponent,
    MangerdashboardComponent,
    EmployeedashboardComponent,
    AccountantdashboardComponent,
    AdmindashboardComponent,
    DeliverychallanComponent,
    RequirementComponent,
    QuatationComponent,
    EmployeeComponent,
    QcdashboardComponent,
    DispatchdashboardComponent,
    SafeurlpipePipe,
    ViewrequirementComponent,
    ViewpurchaseorderComponent,
    ViewquotationComponent,
    BillComponent,
    ViewbillComponent,
    ViewworkorderComponent,
    MangerworkorderComponent,
    EngineerworkorderComponent,
    QcworkorderComponent,
    DispatchmanagerworkorderComponent,
    EmployeedashboardnavbarComponent,
    EmployeedetailsComponent,
    ChallandetailsComponent,
    ClientsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
