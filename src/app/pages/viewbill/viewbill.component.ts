import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-viewbill',
  templateUrl: './viewbill.component.html',
  styleUrls: ['./viewbill.component.css']
})
export class ViewbillComponent implements OnInit {

  AllBills: any[] = [];

  constructor(private _rest: RestService, private _activatedroute: ActivatedRoute) { }

  ngOnInit(): void {
    this._activatedroute.params.subscribe(params => {
      const Bill_Id = params['Bill_Id'];

      this._rest.AllBillbyid(Bill_Id).subscribe((data: any) => {
        console.log(data);
        this.AllBills = data.data;
      }, (err: any) => {
        console.log(err);
      });
    });
  }

}
