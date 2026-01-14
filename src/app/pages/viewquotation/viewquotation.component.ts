import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-viewquotation',
  templateUrl: './viewquotation.component.html',
  styleUrls: ['./viewquotation.component.css']
})
export class ViewquotationComponent implements OnInit {
  Quotations: any[] = [];

  constructor(private _RestService: RestService, private _activatedRoute: ActivatedRoute, private Sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(params => {
      const Quotation_Id = params['Quotation_Id'];

      this._RestService.ByidAllQuotation(Quotation_Id).subscribe((res: any) => {
        this.Quotations = res.data;
      }, (err: any) => {
        console.log(err);
      });
    });
  }
}
