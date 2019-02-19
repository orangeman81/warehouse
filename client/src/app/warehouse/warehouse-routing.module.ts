import { AuthGuard } from './../services/auth/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WarehouseComponent } from './warehouse.component';
import { WhListComponent } from './wh-list/wh-list.component';
import { WhCreateComponent } from './wh-create/wh-create.component';
import { WhDetailsComponent } from './wh-details/wh-details.component';
import { WhDetailsResolver } from './resolvers/whDetails.resolver';
import { WhCheckinComponent } from './wh-checkin/wh-checkin.component';
import { WhCheckinResolver } from './resolvers/whCheckin.resolver';

const routes: Routes = [
  {
    path: "",
    component: WarehouseComponent,
    canActivate: [AuthGuard],
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
        path: "checkin/:id",
        component: WhCheckinComponent,
        resolve: {
          incoming: WhCheckinResolver
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
