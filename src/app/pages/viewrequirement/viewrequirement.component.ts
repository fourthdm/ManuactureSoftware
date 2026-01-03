import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-viewrequirement',
  templateUrl: './viewrequirement.component.html',
  styleUrls: ['./viewrequirement.component.css']
})
export class ViewrequirementComponent implements OnInit {
  AllRequirementData: any[] = [];
  designFileUrl: string = '';
  constructor(private _RestService: RestService, private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe((params: Params) => {
      const Req_id = params['Req_id'];
      this._RestService.Requirementdetails(Req_id).subscribe((reqData: any) => {
        this.AllRequirementData = reqData.data;
        if (this.AllRequirementData.length > 0) {
          const designFileUrl = this.AllRequirementData[0].DesignFile;
          this.designFileUrl = `https://sharecad.org/cadframe/load?url=${encodeURIComponent(designFileUrl)}`;
        }
      });
    });
  }
}
