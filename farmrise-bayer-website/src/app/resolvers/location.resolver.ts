import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { BehaviorSubject, Observable, catchError, of } from 'rxjs';
import { DataService } from '../services/data.service';

@Injectable({
  providedIn: 'root'
})
export class LocationResolver implements Resolve<any> {

  defaultIpAddress = "49.37.242.147";

  defaultLocation = new BehaviorSubject<Object>({
    "region_code": "KA",
    "region_name": "Karnataka",
    "city": "Bangalore",
    "latitude": "15.399100303649902",
    "longitude": "75.22460174560547",
    "location": {
      "geoname_id": "1269920",
      "capital": "New Delhi",
      "languages": [
        {
          "code": "en",
          "name": "English",
          "native": "हिन्दी"
        },
        {
          "code": "en",
          "name": "English",
          "native": "English"
        }
      ]
    }
  })
  defaultLocationObs = this.defaultLocation.asObservable();

  constructor(private dataService: DataService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.defaultLocationObs
      .pipe(catchError(err => {
        return this.defaultLocationObs
      }))
  }

}
