import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
import { Location } from "@angular/common";

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit{

  detectedDevice = 'desktop'

  constructor(private breakpointObserver: BreakpointObserver, private location: Location){}

  ngOnInit(): void {
    this.breakpointObserver.observe(Breakpoints.HandsetPortrait)
      .subscribe(screen => {
        if (screen.matches) {
          this.detectedDevice = 'mobile'
        }
        else {
          this.detectedDevice = 'desktop'
        }
      })
  }

  goBack(){
    this.location.back()
  }
}
