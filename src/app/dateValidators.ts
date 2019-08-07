import { FormControl } from '@angular/forms';

export class dateValidators {
  static minDateValidation(minDate) {
    return function (element: FormControl) {
        let elementValue = element.value;
        return ( +new Date(elementValue) < +new Date(minDate))? {"minDate": true} : null;
    }
  }
  static maxDateValidation(maxDate) {
    return function (element: FormControl) {
        let elementValue = element.value;
        return ( +new Date(elementValue) > +new Date(maxDate)) ? { "maxDate": true } : null;
    }
  }
}