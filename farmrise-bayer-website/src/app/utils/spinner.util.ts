import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { DataService } from '../services/data.service';

@Injectable({
  providedIn: 'root'
})
export class SpinnerUtils {

  constructor(public router: Router,
    public spinnerService: NgxSpinnerService,
    public dataService: DataService
    ) {
  }

  public showSpinner() {
    this.spinnerService.show();
  }

  public hideSpinner() {
    this.spinnerService.hide();    
  }
}