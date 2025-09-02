import { Pipe, PipeTransform } from '@angular/core';
import { ButtonType, EButtonType } from '../models/button-type.enum';

@Pipe({
  name: 'buttontype',
})
export class ButtontypePipe implements PipeTransform {
  transform(value: ButtonType): string {
    return EButtonType[value];
  }
}
