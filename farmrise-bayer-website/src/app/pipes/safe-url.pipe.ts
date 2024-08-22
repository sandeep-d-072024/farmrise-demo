import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safeUrl'
})
/* 
  ** This pipe is sanitize the media urls used in the website to avoid XSS attack
  ** This also prevents error of loading embed video urls
  @Param(url), any url through which video/audio resources can be accessed
 */
export class SafeUrlPipe implements PipeTransform {

  constructor(private domSanitizer: DomSanitizer) { }
  transform(value: any): any {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(value);
  }

}
