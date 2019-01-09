import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WarehouseRoutingModule } from './warehouse-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { WarehouseComponent } from './warehouse.component';
import { WhListComponent } from './wh-list/wh-list.component';
import { WhCreateComponent } from './wh-create/wh-create.component';
import { WhDetailsComponent } from './wh-details/wh-details.component';
import { WhFormComponent } from './wh-form/wh-form.component';
import { StoreModule } from '@ngrx/store';
import * as fromWarehouse from './warehouse.reducer';

@NgModule({
  declarations: [WarehouseComponent, WhListComponent, WhCreateComponent, WhFormComponent, WhDetailsComponent],
  imports: [
    CommonModule,
    WarehouseRoutingModule,
    ReactiveFormsModule,
    StoreModule.forFeature('warehouse', fromWarehouse.whReducer)
  ]
})
export class WarehouseModule { }
