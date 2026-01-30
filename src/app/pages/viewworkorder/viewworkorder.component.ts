import { isPlatformWorkerApp } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-viewworkorder',
  templateUrl: './viewworkorder.component.html',
  styleUrls: ['./viewworkorder.component.css']
})
export class ViewworkorderComponent implements OnInit {

  pdfUrl: string | null = null;

  WorkorderData: any[] = [];
  // pdfUrl!: string;

  constructor(private _rest: RestService, private _activatedRoute: ActivatedRoute, private sanitizer: DomSanitizer) { }

   ngOnInit(): void {
    this._activatedRoute.params.subscribe(params => {
      const Workorder_Id = params['Workorder_Id'];

      this._rest.WorkorderbyID(Workorder_Id).subscribe((data: any) => {
        console.log(data);
        this.pdfUrl = data.PDFDesignfile;
        this.WorkorderData = data.data;
      }, (err: any) => {
        console.log(err);
      });
    })
  }

  getsafeurl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  downloadFromUrl(fileUrl: string) {
    const fileName = fileUrl.split('/').pop();   // extract file name

    const a = document.createElement('a');
    a.href = fileUrl;
    a.download = fileName ?? 'file';   // force download
    a.target = "_blank";
    a.click();
  }


}
