import { AsDetailsResolver } from './resolvers/asDetails.resolver';
import { ComponentsModule } from './../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssigneeRoutingModule } from './assignee-routing.module';
import { AssigneeComponent } from './assignee.component';
import { AsCreateComponent } from './as-create/as-create.component';
import { AsDetailsComponent } from './as-details/as-details.component';
import { AsListComponent } from './as-list/as-list.component';
import { AsFormComponent } from './as-form/as-form.component';
import { EffectsModule } from '@ngrx/effects';
import { AssigneeEffects } from './store/assignee.effects';
import { StoreModule } from '@ngrx/store';
import * as fromAssignee from './store/assignee.reducer';
import * as fromWarehouse from './../warehouse/store/warehouse.reducer';
import { WarehouseEffects } from '../warehouse/store/warehouse.effects';
import { AsAssignComponent } from './as-assign/as-assign.component';

@NgModule({
  declarations: [AssigneeComponent, AsCreateComponent, AsDetailsComponent, AsListComponent, AsFormComponent, AsAssignComponent],
  imports: [
    CommonModule,
    AssigneeRoutingModule,
    ComponentsModule,
    StoreModule.forFeature('assignees', fromAssignee.asReducer),
    StoreModule.forFeature('warehouse', fromWarehouse.whReducer),
    EffectsModule.forFeature([WarehouseEffects]),
    EffectsModule.forFeature([AssigneeEffects])
  ],
  providers: [AsDetailsResolver]
})
export class AssigneeModule { }
