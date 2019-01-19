import { MainComponent } from './main/main.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    component: MainComponent
  },
  {
    path: "warehouse",
    loadChildren: './warehouse/warehouse.module#WarehouseModule'
  },
  {
    path: "assignee",
    loadChildren: './assignee/assignee.module#AssigneeModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
