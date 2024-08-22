import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(value: number): string {
    let date = new Date(value);
    return date.toLocaleDateString('en-GB', {day: '2-digit', month: 'short', year: 'numeric'});
  }

}
