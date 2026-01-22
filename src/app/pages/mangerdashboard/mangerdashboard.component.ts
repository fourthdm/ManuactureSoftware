import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-mangerdashboard',
  templateUrl: './mangerdashboard.component.html',
  styleUrls: ['./mangerdashboard.component.css']
})
export class MangerdashboardComponent implements OnInit {

  notifications: any[] = [];
  alertCount = 0;

  constructor(private _rest: RestService) { }

  ngOnInit(): void {
   this.loadNotifications();
  }

  loadNotifications() {
    this._rest.getNotifications('Manager').subscribe(data => {
      this.notifications = data;
      this.alertCount = data.filter(n => n.Status === 'Unread').length;
    });
  }

}
