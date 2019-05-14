import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms';
import { AmountInputComponent } from '../../../custom-controls/input/components/amount-input/amount-input.component';

@Component({
  selector: 'app-amount-form',
  templateUrl: './amount-form.component.html',
  styleUrls: ['./amount-form.component.less']
})
export class AmountFormComponent implements OnInit, AfterViewInit {
  form = this.fb.group({
    input1: new FormControl('2000'),
    input2: new FormControl({ value: '1000', disabled: false })
  });

  @ViewChild('someThing', { read: AmountInputComponent }) inputRef?: AmountInputComponent;

  constructor(
    private readonly fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    // this.form.valueChanges.subscribe(res => {

    // });
    this.form.controls.input1.valueChanges.subscribe(res => {
      // console.log('input1', {res});
      const secondValue = res / 2;
      if (this.form.controls.input2.value !== (secondValue).toString() &&
        this.form.controls.input2.value !== (`${secondValue}.`)) {
        this.form.controls.input2.setValue((secondValue).toString());
      }
    });
    this.form.controls.input2.valueChanges.subscribe(res => {
      // console.log('input2', {res});
      const secondValue = res * 2;
      if (this.form.controls.input1.value !== (secondValue).toString() &&
        this.form.controls.input1.value !== (`${secondValue}.`)) {
        this.form.controls.input1.setValue((secondValue).toString());
      }
    });

    setTimeout(() => {
      this.form.controls.input1.setValue('5000');
    }, 500);
  }

  ngAfterViewInit(): void {
    if (this.inputRef && this.inputRef.inputRef) {
      console.log('input ref', this.inputRef.inputRef.nativeElement);
      this.inputRef.inputRef.nativeElement.focus();
    }
  }
}
