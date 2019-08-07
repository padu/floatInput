import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, Validators, FormControl } from '@angular/forms';
import { dateValidators } from './dateValidators';

@Directive({
  selector: '[customMax][formControlName],[customMax][formControl],[customMax][ngModel],[customMax][(ngModel)]',
  providers: [{provide: NG_VALIDATORS, useExisting: dateValidators, multi: true}]
})
export class CustomMaxDirective implements Validator {
  @Input()
  maxDate: string;
  private valFn = Validators.nullValidator;

  ngOnChanges(): void {
    if (this.maxDate) {
      this.valFn = dateValidators.maxDateValidation(this.maxDate);
    } else {
      this.valFn = Validators.nullValidator;
    }
  }

  validate(control: FormControl): {[key: string]: any} {
    return this.valFn(control);
  }
}