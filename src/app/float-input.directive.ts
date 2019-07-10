import { Directive, ElementRef, HostListener, Renderer2, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: '[floatInput]',
  providers: [{provide: NG_VALUE_ACCESSOR, useExisting: FloatInputDirective, multi: true}]    
})
export class FloatInputDirective implements ControlValueAccessor {

  @Input() decimalPlaces = 3;

  private regex: RegExp = new RegExp(/^\d*\.?\d{0,2}$/g);
  private specialKeys: Array<string> = [  
    'Backspace',
    'Tab',
    'End',
    'Home',
    'ArrowLeft',
    'ArrowRight',
    'Del',
    'Delete',
    'Control'
  ];

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  onChange: any = () => {}
  onTouch: any = () => {}

  val= ""; // this is the updated value that the class accesses

  set value(val) {  // this value is updated by programmatic changes if( val !== undefined && this.val !== val){
    this.val = val
    this.onChange(val)
    this.onTouch(val)
  }

  // this method sets the value programmatically
  writeValue(value: any) {
    this.value = value;
    this.setViewValue(value);
  }

  // upon UI element value changes, this method gets triggered
  registerOnChange(fn: any) {
    this.onChange = fn
  }

  // upon touching the element, this method gets triggered
  registerOnTouched(fn: any) {
    this.onTouch = fn
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    // Allow Backspace, tab, end, and home keys
    if ((this.specialKeys.indexOf(event.key) !== -1) ||
        // allow meta char keys combinations
        ((event.ctrlKey || event.metaKey) && !String(event.key).match(this.regex))) {
      return;
    }

    let current: string = this.el.nativeElement.value;
    let next: string = current.concat(event.key);
    if (next && !String(next).match(this.regex)) {
      event.preventDefault();
    }
  }

  @HostListener('blur', ['$event'])
  onBlur(event: Event) {
    this.setViewValue(this.el.nativeElement.value);
  }

  setViewValue(inputVal) {
    let modifiedVal = parseFloat(inputVal).toFixed(this.decimalPlaces); 
    if (inputVal) {
      this.renderer.setProperty(this.el.nativeElement, 'value', modifiedVal);
      this.value = modifiedVal;
    } else {
      this.value = parseFloat('0').toFixed(this.decimalPlaces);
    }
  }
}
