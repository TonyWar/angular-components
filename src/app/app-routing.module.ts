import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { clientRoutes } from './routes';
import { AmountFormComponent } from './form/custom-forms/components/amount-form/amount-form.component';
import { SearchableListComponent } from './UX/controls/components/searchable-list/searchable-list.component';
import { ExampleSearchableListComponent } from './form/custom-forms/components/example-searchable-list/example-searchable-list.component';

const routes: Routes = [
  {path: clientRoutes.amountFormPage, component: AmountFormComponent},
  {path: clientRoutes.searchableList, component: SearchableListComponent},
  {path: clientRoutes.exampleSearchableList, component: ExampleSearchableListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
