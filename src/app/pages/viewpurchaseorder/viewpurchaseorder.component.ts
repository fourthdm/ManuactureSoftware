import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-viewpurchaseorder',
  templateUrl: './viewpurchaseorder.component.html',
  styleUrls: ['./viewpurchaseorder.component.css']
})
export class ViewpurchaseorderComponent implements OnInit {

  PurchaseOrders: any[] = [];

  constructor(private _RestService: RestService, private _activatedRoute: ActivatedRoute, private Sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(params => {
      const Id = params['Id'];

      this._RestService.Purchaseorderbyid(Id).subscribe((res: any) => {
        this.PurchaseOrders = res.data;
      }, (err: any) => {
        console.log(err);
      });
    });
  }
}
