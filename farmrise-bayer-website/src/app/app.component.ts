import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { LanguageService } from './services/language.service';
import { environment } from "../environments/environment";
import {Meta, Title} from "@angular/platform-browser";
import {filter} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  displayLanguageSelectionPopup = false;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private languageService: LanguageService, private metaTag: Meta, private title: Title) {
    this.languageService.displayLangSelPopupObs.subscribe(value => {
      this.displayLanguageSelectionPopup = value
    })
    let gtagScript1 = document.createElement('script');
    gtagScript1.src = environment.gtag.src;
    let gtagScript2 = document.createElement('script');
    gtagScript2.innerText = environment.gtag.innerHtml
    document.getElementsByTagName('head')[0].appendChild(gtagScript1)
    document.getElementsByTagName('head')[0].appendChild(gtagScript2)
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if(!(event instanceof NavigationEnd)){
        return;
      }
      window.scrollTo(0, 0)
    })

    this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const activeRt = this.getChild(this.activatedRoute);
      activeRt.data.subscribe((data)=> {
        this.title.setTitle(data['title'])
        this.metaTag.updateTag({name: 'description', content: data['description']})
        this.metaTag.updateTag({name: 'robots', content: data['robots']})
      })
    })
  }

  private getChild(activatedRoute: ActivatedRoute): ActivatedRoute {
    if(activatedRoute.firstChild) {
      return this.getChild(activatedRoute.firstChild);
    }else {
      return activatedRoute;
    }
  }
}