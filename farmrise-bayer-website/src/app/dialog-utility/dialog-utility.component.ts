import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-utility',
  templateUrl: './dialog-utility.component.html',
  styleUrls: ['./dialog-utility.component.css']
})
export class DialogUtilityComponent implements OnInit{

  displayDocument: string = '';

  @Input()
  documentType:any;

  constructor(private dataService: DataService, private location: Location, private router: Router){}

  ngOnInit(): void {
    this.documentType = this.router.url;
    if(this.documentType.includes('privacy-policy')){
      this.dataService.getPrivacyPolicy().subscribe((data: any)=>{
        this.displayDocument = data;
      })
    }
    else{
      this.dataService.getTermsAndConditions().subscribe((data:any)=> {
        this.displayDocument = data;
      })
    }
    
  }

  closeLanguageSelectionPopup() {
    this.location.back()
  }

}
