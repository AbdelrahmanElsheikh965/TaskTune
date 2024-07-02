import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productIntPrice',
  standalone: true
})
export class ProductIntPricePipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): number {
    return Math.floor(value);
  }

}
