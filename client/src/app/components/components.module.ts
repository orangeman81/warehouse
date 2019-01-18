import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { ListComponent } from './list/list.component';
import { SelectComponent } from './forms/select/select.component';
import { PaginatorComponent } from './paginator/paginator.component';

@NgModule({
  declarations: [NavComponent, FooterComponent, ListComponent, SelectComponent, PaginatorComponent],
  imports: [
    CommonModule
  ],
  exports: [NavComponent, FooterComponent, PaginatorComponent]
})
export class ComponentsModule { }
