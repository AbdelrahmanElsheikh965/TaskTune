import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productDiscount',
  standalone: true
})
export class ProductDiscountPipe implements PipeTransform {

  transform(value: number, ...args: number[]): string {
    return (value - ( (value * args[0] ) / 100)).toFixed(2);
  }

}
