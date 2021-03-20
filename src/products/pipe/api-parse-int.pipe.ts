import { PipeTransform } from '@nestjs/common';

export class ApiParseIntPipe implements PipeTransform {
  transform(value: string | string[]) {
    let returnValue: number | number[];

    returnValue = Array.isArray(value)
      ? value.map(el => parseInt(el, 10))
      : (returnValue = parseInt(value, 10));

    return returnValue;
  }
}