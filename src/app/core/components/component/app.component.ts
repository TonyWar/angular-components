import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { AmountInputComponent } from 'src/app/form/input/components/amount-input/amount-input.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit, AfterViewInit {
  form = this.fb.group({
    input1: new FormControl('2000'),
    input2: new FormControl({value: '1000', disabled: false})
  });

  @ViewChild('someThing', {read: AmountInputComponent}) inputRef?: AmountInputComponent;

  constructor(
    private readonly fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    // this.form.valueChanges.subscribe(res => {
    //   console.log('form changed', res);
    // });
    this.form.controls.input1.valueChanges.subscribe(res => {
      console.log('input1', {res});
      if (this.form.controls.input2.value !== (res / 2).toString() && this.form.controls.input2.value !== ((res / 2) + '.')) {
        this.form.controls.input2.setValue((res / 2).toString());
      }
    });
    this.form.controls.input2.valueChanges.subscribe(res => {
      console.log('input2', {res});
      if (this.form.controls.input1.value !== (res * 2).toString() && this.form.controls.input1.value !== ((res * 2) + '.')) {
        this.form.controls.input1.setValue((res * 2).toString());
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
