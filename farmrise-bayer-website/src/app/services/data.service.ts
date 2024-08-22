import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import * as uuid from 'uuid';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  topCrops: any[] = [];
  isWhatsAppSubscribed = new BehaviorSubject<boolean>(false);
  isWhatsAppSubscribedObs = this.isWhatsAppSubscribed.asObservable();

  isWhatsAppResponseClosed = new BehaviorSubject<boolean>(false);
  isWhatsAppResponseClosedObs = this.isWhatsAppResponseClosed.asObservable();

  isFeedBackSubmitted = new BehaviorSubject<boolean>(false);
  isFeedBackSubmittedObs = this.isFeedBackSubmitted.asObservable();

  endpoints = {
    homeScreen: '/home?pageOffset=0&pageLimit=6',
    article: '/article',
    news: '/news',
    feedback: '/review',
    location: '/location',
    govtscheme: '/govt-scheme',
    whatsAppSubscription: '/whatsapp-subscription?userPhoneNumber=',
    privacyPolicy: '/privacy-policy?locale=en',
    termsAndConditions: '/terms-and-conditions?locale=en'
  }

  constructor(private http: HttpClient) { }

  getHomeScreenData(userLocation: any, languageId: any): Observable<any>{    
    let headers = new HttpHeaders({
      'requestId': uuid.v4() ,
      'languageId': String(languageId),
      'latitude':  String(userLocation.latitude),
      'longitude': String(userLocation.longitude),
      'state': String(userLocation.state),
      'x-api-key': environment.xApiKey
    })
    let url = environment.websiteAggregatorServiceUrl + this.endpoints.homeScreen;
    return this.http.get(url, {headers: headers});
  }

  getExpertArticle(articleId: string, languageId: string, state: string){
    let headers = new HttpHeaders({
      'requestId': uuid.v4(),
      'languageId': String(languageId),
      'state': String(state),
      'x-api-key': environment.xApiKey
    })
    let url = environment.websiteAggregatorServiceUrl + this.endpoints.article + `/${articleId}`;
    return this.http.get(url, {headers: headers})
  }

  getGovtScheme(schemeId: string, languageId: string, state: string){
    let headers = new HttpHeaders({
      'requestId': uuid.v4(),
      'languageId': String(languageId),
      'state': String(state),
      'x-api-key': environment.xApiKey
    })
    let url = environment.websiteAggregatorServiceUrl + this.endpoints.govtscheme + `/${schemeId}`
    return this.http.get(url, {headers: headers})
  }

  getUserIpAddress(){
    return this.http.get(environment.ipfyUrl);
  }

  getUserLocation(){
    if(sessionStorage.getItem('userLocation')){
      return new Observable<Object>(JSON.parse(sessionStorage.getItem('userLocation')!))
    }
    let url  = environment.websiteAggregatorServiceUrl + this.endpoints.location;
    let headers = new HttpHeaders({
      'requestId': uuid.v4(),
      'x-api-key': environment.xApiKey
    })
    return this.http.get(url, {headers: headers});
  }

  saveUserFeedback(feedback: any) {
    let url = environment.websiteAggregatorServiceUrl + this.endpoints.feedback;
    let headers = new HttpHeaders({
      'requestId': uuid.v4(),
      'x-api-key': environment.xApiKey
    })
    return this.http.post(url, feedback, {headers: headers})
  }

  getNewsList(languageId: string, state: string) {
    let url = environment.websiteAggregatorServiceUrl + this.endpoints.news;
    let headers = new HttpHeaders({
      'requestId': uuid.v4(),
      'x-api-key': environment.xApiKey,
      'languageId': String(languageId),
      'state': String(state)
    })
    return this.http.get(url, {headers: headers})
  }

  saveWhatsAppSubscription(data: any, languageId: any){
    let url = environment.websiteAggregatorServiceUrl + this.endpoints.whatsAppSubscription + data.userPhoneNumber;
    let headers = new HttpHeaders({
      'requestId': uuid.v4(),
      'languageId': String(languageId),
      'x-api-key': environment.xApiKey
    })
    return this.http.post(url, data, {headers: headers});
  }

  getPrivacyPolicy(){
    let url = environment.websiteAggregatorServiceUrl + this.endpoints.privacyPolicy;
    let headers = new HttpHeaders({
      'requestId': uuid.v4(),
      'Accept': 'text/html',
      'x-api-key': environment.xApiKey
    })
    return this.http.get(url, {headers: headers, responseType: 'text'})
  }

  getTermsAndConditions(){
    let url = environment.websiteAggregatorServiceUrl + this.endpoints.termsAndConditions;
    let headers = new HttpHeaders({
      'requestId': uuid.v4(),
      'Accept': 'text/html',
      'x-api-key': environment.xApiKey
    })
    return this.http.get(url, {headers: headers, responseType: 'text'})
  }
}
