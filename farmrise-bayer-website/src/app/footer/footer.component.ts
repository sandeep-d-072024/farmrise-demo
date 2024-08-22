import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  desktopView: boolean = false
  mobileView: boolean = false

  constructor(private router: Router) {
    window.screen.width > 916 ? this.displayView(true) : this.displayView(false)
  }

  ngOnInit(): void {
  }

  displayView(isVisible: boolean) {
    this.desktopView = isVisible;
    this.mobileView = !isVisible;
  }

  showPrivacyPolicy() {
    this.router.navigateByUrl('/privacy-policy')
  }

  showTermsAndConditions(){
    this.router.navigateByUrl('/terms-and-conditions')
  }
  openCareersPage(){
    window.open(environment.careers);
  }
}