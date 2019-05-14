import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchableListComponent } from './UX/controls/components/searchable-list/searchable-list.component';

const routes: Routes = [
  { path: 'searchable-list', component: SearchableListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
