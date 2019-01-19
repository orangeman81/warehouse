import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { ListComponent } from './list/list.component';
import { SelectComponent } from './forms/select/select.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { SearchBarComponent } from './search-bar/search-bar.component';

@NgModule({
  declarations: [NavComponent, FooterComponent, ListComponent, SelectComponent, PaginatorComponent, SearchBarComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [ReactiveFormsModule, RouterModule, NavComponent, FooterComponent, ListComponent, PaginatorComponent, SearchBarComponent]
})
export class ComponentsModule { }
