import { AuthGuard } from './services/auth/auth.guard';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "main"
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "main",
    component: MainComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "warehouse",
    loadChildren: './warehouse/warehouse.module#WarehouseModule'
  },
  {
    path: "assignee",
    loadChildren: './assignee/assignee.module#AssigneeModule'
  },
  {
    path: "incoming",
    loadChildren: './incoming/incoming.module#IncomingModule'
  },
  {
    path: "**",
    redirectTo: "main"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
