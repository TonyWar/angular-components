import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { clientRoutes } from './routes';
import { AmountFormComponent } from './form/custom-forms/components/amount-form/amount-form.component';
import { BankCardFormComponent } from './form/custom-forms/components/bank-card-form/bank-card-form.component';

const routes: Routes = [
  {path: clientRoutes.amountFormPage, component: AmountFormComponent},
  {path: clientRoutes.BankCardFormPage, component: BankCardFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
