import { InDetailsComponent } from './in-details/in-details.component';
import { InCreateComponent } from './in-create/in-create.component';
import { InListComponent } from './in-list/in-list.component';
import { AuthGuard } from './../services/auth/auth.guard';
import { IncomingComponent } from './incoming.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    component: IncomingComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        component: InListComponent
      },
      {
        path: "create",
        component: InCreateComponent
      },
      {
        path: "details/:id",
        component: InDetailsComponent,
        // resolve: {
        //   details: InDetailsResolver
        // }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IncomingRoutingModule { }
