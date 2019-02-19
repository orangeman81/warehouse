import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from './../components/components.module';

import { IncomingRoutingModule } from './incoming-routing.module';
import { IncomingComponent } from './incoming.component';
import { InCreateComponent } from './in-create/in-create.component';
import { InDetailsComponent } from './in-details/in-details.component';
import { InFormComponent } from './in-form/in-form.component';
import { InListComponent } from './in-list/in-list.component';
import { InDetailsResolver } from './resolvers/inDetails.resolver';
import { StoreModule } from '@ngrx/store';
import * as fromIncoming from './store/incoming.reducer';
import { EffectsModule } from '@ngrx/effects';
import { IncomingEffects } from './store/incoming.effects';

@NgModule({
  declarations: [IncomingComponent, InCreateComponent, InDetailsComponent, InFormComponent, InListComponent],
  imports: [
    CommonModule,
    IncomingRoutingModule,
    ComponentsModule,
    StoreModule.forFeature('incoming', fromIncoming.inReducer),
    EffectsModule.forFeature([IncomingEffects])
  ],
  providers: [InDetailsResolver]
})
export class IncomingModule { }
