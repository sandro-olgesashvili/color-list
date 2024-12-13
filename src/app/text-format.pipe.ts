import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textFormat',
})
export class TextFormatPipe implements PipeTransform {
  transform(value: string): string {
    return value.toUpperCase();
  }
}
