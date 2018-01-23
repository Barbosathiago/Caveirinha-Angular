import { Component, OnInit, Input, forwardRef} from '@angular/core';
import {NG_VALUE_ACCESSOR ,ControlValueAccessor} from '@angular/forms'
import {SelectOption} from './select-option.model'

@Component({
  selector: 'cav-select',
  templateUrl: './select.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ]
})
export class SelectComponent implements OnInit, ControlValueAccessor {

  @Input() options: SelectOption[]

  value: any

  @Input() label: string

  constructor() { }

  ngOnInit() {

  }

  onChange: any

  setValue(value: any){    
    this.value = value
    this.onChange(this.value)
  }

  writeValue(obj: any): void{
    this.value = obj;
  }

  registerOnChange(fn: any):void{
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void{

  }

}
