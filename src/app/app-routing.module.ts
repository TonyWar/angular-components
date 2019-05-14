import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { clientRoutes } from './routes';
import { AmountFormComponent } from './form/custom-forms/components/amount-form/amount-form.component';
import { SearchableListComponent } from './UX/controls/components/searchable-list/searchable-list.component';

const routes: Routes = [
  {path: clientRoutes.amountFormPage, component: AmountFormComponent},
  { path: 'searchable-list', component: SearchableListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
