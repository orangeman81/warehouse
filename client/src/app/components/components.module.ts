import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { ListComponent } from './list/list.component';
import { SelectComponent } from './forms/select/select.component';

@NgModule({
  declarations: [NavComponent, FooterComponent, ListComponent, SelectComponent],
  imports: [
    CommonModule
  ],
  exports: [NavComponent, FooterComponent]
})
export class ComponentsModule { }
