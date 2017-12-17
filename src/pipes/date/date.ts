import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment-timezone';
/**
 * Generated class for the DatePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'date',
})
export class DatePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(date: any, format: any): any {
      if (date && format) {
          return moment(date).format(format);
      }
      return null;
  }
}
