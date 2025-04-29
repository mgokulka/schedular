import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortDatePipe',
  standalone: true
})
export class ShortDatePipe implements PipeTransform {
  transform(value: Date): string {
    if (!value) {
      return '';
    }
    return value.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  }
}

