import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'monthDayFormat'
})
export class MonthDayFormatPipe implements PipeTransform {

  transform(date: number): string {
    return new Date(date).getDate() + " " + new Date(date).toLocaleString('default', {month: 'long'})
  }

}
