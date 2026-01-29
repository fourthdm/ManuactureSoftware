import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-challandetails',
  templateUrl: './challandetails.component.html',
  styleUrls: ['./challandetails.component.css']
})
export class ChallandetailsComponent implements OnInit {

  Allchallan: any[] = [];

  constructor(private _rest: RestService, private _activatedroute: ActivatedRoute) { }

  ngOnInit(): void {
    this._activatedroute.params.subscribe(params => {
      const Challan_id = params['Challan_id'];

      this._rest.ChallanbyId(Challan_id).subscribe((data: any) => {
        console.log(data);
        this.Allchallan = data.data;
      }, (err: any) => {
        console.log(err);
      });
    });
  }

}
