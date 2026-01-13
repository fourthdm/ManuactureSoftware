import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-viewrequirement',
  templateUrl: './viewrequirement.component.html',
  styleUrls: ['./viewrequirement.component.css']
})
export class ViewrequirementComponent implements OnInit {
  // AllRequirementData: any[] = [];
  // designFileUrl: string = '';
 
 AllRequirementData: any[] = [];
designFileUrl!: SafeResourceUrl;

  constructor(private _RestService: RestService, private _activatedRoute: ActivatedRoute, private Sanitizer:DomSanitizer) { }

  getsafeUrl (url : string): SafeResourceUrl{
    return this.Sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  ngOnInit(): void {
    
    this._activatedRoute.params.subscribe(params => {
    const Req_id = params['Req_id'];

    this._RestService.Requirementdetails(Req_id).subscribe((res: any) => {
      this.AllRequirementData = res.data;

      if (this.AllRequirementData.length > 0) {
        const pdfUrl = this.AllRequirementData[0].PDFDesignfile;

        if (pdfUrl) {
          this.designFileUrl = this.getsafeUrl(pdfUrl);
        }
      }
    });
  });

    // this._activatedRoute.params.sub
    // scribe((params: Params) => {
    //   const Req_id = params['Req_id'];
    //   this._RestService.Requirementdetails(Req_id).subscribe((reqData: any) => {
    //     this.AllRequirementData = reqData.data;
    //     if (this.AllRequirementData.length > 0) {
    //       const designFileUrl = this.AllRequirementData[0].DesignFile;
    //       this.designFileUrl = `https://sharecad.org/cadframe/load?url=${encodeURIComponent(designFileUrl)}`;
    //     }
    //   });
    // });
  }
}
