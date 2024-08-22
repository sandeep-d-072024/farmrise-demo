import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
import { SpinnerUtils } from '../utils/spinner.util';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { TranslateService } from '@ngx-translate/core';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-expert-articles',
  templateUrl: './expert-articles.component.html',
  styleUrls: ['./expert-articles.component.css']
})
export class ExpertArticlesComponent implements OnInit, OnDestroy {

  detectedDevice = 'desktop';
  defaultLanguage = 'en';
  articleId: string = '';
  articleApiResponse: any = {
    title: '',
    subtitle: '',
    description: '',
    url: '',
    publishDate: '',
    source: '',
    likes: '',
    relatedArtilces: [
        {
            articleId: '',
            url: '',
            title: '',
            likes: '',
            publishedDate: '',
            viewCount: '',
            viewsLastUpdatedAt: '',
            authorName: ''
        }
    ]
  }
  showErrorResponse: boolean = false;

  constructor(private breakpointObserver: BreakpointObserver, private spinnerUtil: SpinnerUtils,
    private activatedRoute: ActivatedRoute, private dataService: DataService,
    private translateService: TranslateService) { }

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
      this.translateService.use(sessionStorage.getItem('language_ISO')!);
      if(sessionStorage.getItem('articleApiResponse')){
        this.articleApiResponse = JSON.parse(sessionStorage.getItem('articleApiResponse')!);
      }
      this.spinnerUtil.showSpinner()
      let userLocation = JSON.parse(sessionStorage.getItem('userLocation')!);
      this.articleId = this.activatedRoute.snapshot.params['articleId'];
      this.dataService.getExpertArticle(this.articleId, userLocation.languageId, userLocation.state).pipe(
        catchError(err => {
          this.showErrorResponse = true;
          return throwError(err)
        })
      ).subscribe(async data => {
        let apiResponse: any = data;
        if(apiResponse.articleDetailsResponseBO.articleComponents){
          this.resolveArticlesApiResponse(apiResponse)
        }
        sessionStorage.setItem('articleApiResponse', JSON.stringify(this.articleApiResponse))
        this.spinnerUtil.hideSpinner()
      })
  }

  private resolveArticlesApiResponse(apiResponse: any) {
    this.articleApiResponse.title = apiResponse.articleDetailsResponseBO.articleComponents[apiResponse.articleDetailsResponseBO.articleComponents.findIndex((i: any) => i.componentName === 'TITLE')]!.value;
          this.articleApiResponse.description = apiResponse.articleDetailsResponseBO.articleComponents[apiResponse.articleDetailsResponseBO.articleComponents.findIndex((i: any) => i.componentName === 'DESCRIPTION')]!.value;
          let urlIndex = apiResponse.articleDetailsResponseBO.articleComponents.findIndex((i: any) => i.componentName === 'LARGE_CAROUSAL')
          if(urlIndex === -1){
            urlIndex = apiResponse.articleDetailsResponseBO.articleComponents.findIndex((i: any) => i.componentName === 'SMALL_CAROUSAL')
          }
          this.articleApiResponse.url = apiResponse.articleDetailsResponseBO.articleComponents[urlIndex].attachments[0]!.url
          this.articleApiResponse.likes = apiResponse.articleDetailsResponseBO.likes;
          this.articleApiResponse.publishDate = apiResponse.articleDetailsResponseBO.authorProfileResponseBO.publishedDate;
          this.articleApiResponse.relatedArtilces = apiResponse.authorBOList
  }

  appDownload() {
    window.open(environment.appDownloadBannerDynamicLink, "appDownloadBannerDynamicLink")
  }

  ngOnDestroy(): void {
    sessionStorage.removeItem('articleApiResponse')
  }

  expertArticle = {
    articleImg: '../../assets/expert_article.png',
    articleTitle: 'Explaining farming systems spatial patterns Explaining farming',
    articleSource: 'Tv9 Marathi | ',
    articleDescription: 'HONOLULU (KHON2) — Two farmers were awardedland on Wednesday, Sept. 29, which is next to a property that is notorious for illegal activity. However, some people said putting farmers on theland is not enough to stop crime and illegal dumping in the area.According to one farmer, it all boils down to security. Theft, illegal dumping and nefarious activities will persist without regular patrols and law enforcement.Roughly five acres of land near <br> <br> Whitmore Village — across from Poamoho Camp — has been a haven for criminal activity, illegal dumping and dangerous brush fires for years. That land is meant to be farmed. It is owned by the state and is just a small portion of the 4200 acres managed by the Agribusiness Development Corporation (ADC).'
  }

  relatedArticles = [
    {
      relatedArticleImg: '../../assets/relatedArticle1.png',
      relatedArticleTitle: 'MH Shop registration license',
      relatedArticleInfo: 'November 25, 2022',
      relatedArticleBrief: 'Bayer is a global enterprise with core competencies in the life science fields of healthcare and nutrition. We des ….More',
    },
    {
      relatedArticleImg: '../../assets/relatedArticle2.png',
      relatedArticleTitle: 'MH Shop registration license',
      relatedArticleInfo: 'November 25, 2022',
      relatedArticleBrief: 'Bayer is a global enterprise with core competencies in the life science fields of healthcare and nutrition. We des ….More',
    }
  ]

}
