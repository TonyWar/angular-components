import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmountFormComponent } from './amount-form.component';
import { ReactiveFormsModule } from '@angular/forms';
// tslint:disable-next-line: no-implicit-dependencies
import { CustomControlsModule } from 'src/app/form/custom-controls/custom-controls.module';

describe('AmountFormComponent', () => {
  let component: AmountFormComponent;
  let fixture: ComponentFixture<AmountFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AmountFormComponent],
      imports: [
        ReactiveFormsModule,
        CustomControlsModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmountFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
