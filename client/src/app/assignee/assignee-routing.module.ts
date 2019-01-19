import { AsDetailsComponent } from './as-details/as-details.component';
import { AsCreateComponent } from './as-create/as-create.component';
import { AsListComponent } from './as-list/as-list.component';
import { AssigneeComponent } from './assignee.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AsDetailsResolver } from './resolvers/asDetails.resolver';

const routes: Routes = [
  {
    path: "",
    component: AssigneeComponent,
    children: [
      {
        path: "",
        component: AsListComponent
      },
      {
        path: "create",
        component: AsCreateComponent
      },
      {
        path: "details/:id",
        component: AsDetailsComponent,
        resolve: {
          details: AsDetailsResolver
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssigneeRoutingModule { }
