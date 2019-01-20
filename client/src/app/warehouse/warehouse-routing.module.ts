import { WhAssignResolver } from './resolvers/whAssign.resolver';
import { WhAssignComponent } from './wh-assign/wh-assign.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WarehouseComponent } from './warehouse.component';
import { WhListComponent } from './wh-list/wh-list.component';
import { WhCreateComponent } from './wh-create/wh-create.component';
import { WhDetailsComponent } from './wh-details/wh-details.component';
import { WhDetailsResolver } from './resolvers/whDetails.resolver';

const routes: Routes = [
  {
    path: "",
    component: WarehouseComponent,
    children: [
      {
        path: "",
        component: WhListComponent
      },
      {
        path: "create",
        component: WhCreateComponent
      },
      {
        path: "details/:id",
        component: WhDetailsComponent,
        resolve: {
          details: WhDetailsResolver
        }
      },
      {
        path: "assign/:id",
        component: WhAssignComponent,
        resolve: {
          details: WhAssignResolver
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WarehouseRoutingModule { }
