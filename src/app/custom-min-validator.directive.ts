import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, Validators, FormControl } from '@angular/forms';
import { dateValidators } from './dateValidators';

@Directive({
  selector: '[customMin][formControlName],[customMin][formControl],[customMin][ngModel],[customMin][(ngModel)]',
  providers: [{provide: NG_VALIDATORS, useExisting: dateValidators, multi: true}]
})
export class CustomMinDirective implements Validator {
  @Input()
  minDate: string;
  private valFn = Validators.nullValidator;

  ngOnChanges(): void {
    if (this.minDate) {
      this.valFn = dateValidators.minDateValidation(this.minDate);
    } else {
      this.valFn = Validators.nullValidator;
    }
  }

  validate(control: FormControl): {[key: string]: any} {
    return this.valFn(control);
  }
}