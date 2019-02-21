import { WhAssignResolver } from './resolvers/whAssign.resolver';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WarehouseRoutingModule } from './warehouse-routing.module';
import { WarehouseComponent } from './warehouse.component';
import { WhListComponent } from './wh-list/wh-list.component';
import { WhCreateComponent } from './wh-create/wh-create.component';
import { WhDetailsComponent } from './wh-details/wh-details.component';
import { WhFormComponent } from './wh-form/wh-form.component';
import { StoreModule } from '@ngrx/store';
import * as fromWarehouse from './store/warehouse.reducer';
import { EffectsModule } from '@ngrx/effects';
import { WarehouseEffects } from './store/warehouse.effects';
import { WhDetailsResolver } from './resolvers/whDetails.resolver';
import { ComponentsModule } from '../components/components.module';
import { WhCheckinComponent } from './wh-checkin/wh-checkin.component';
import { WhCheckinResolver } from './resolvers/whCheckin.resolver';

@NgModule({
  declarations: [WarehouseComponent, WhListComponent, WhCreateComponent, WhFormComponent, WhDetailsComponent, WhCheckinComponent],
  imports: [
    CommonModule,
    WarehouseRoutingModule,
    ComponentsModule,
    StoreModule.forFeature('warehouse', fromWarehouse.whReducer),
    EffectsModule.forFeature([WarehouseEffects])
  ],
  providers: [WhDetailsResolver, WhAssignResolver, WhCheckinResolver]
})
export class WarehouseModule { }