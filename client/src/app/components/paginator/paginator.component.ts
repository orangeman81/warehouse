import { Component, EventEmitter, Output, Input, ChangeDetectionStrategy } from '@angular/core';
import { PaginationService } from 'src/app/services/pagination.service';

@Component({
  selector: 'wh-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
  providers: [PaginationService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginatorComponent {

  //list length
  @Input()
  get length(): number { return this._pages.currentLength };
  set length(value: number) {
    this._pages.currentLength = value;
    this.pageIndex = 0;
    console.log('length ', value)
    console.log(this.pageIndex)
  }

  //list size
  @Input()
  get size(): number { return this._pages.currentSize };
  set size(value: number) {
    this._pages.currentSize = value;
  }

  //if pagination has numbers
  @Input()
  hasNumbers: boolean = false;

  //data output
  @Output()
  data: EventEmitter<any> = new EventEmitter();

  //current page number
  get pageIndex(): number { return this._pages.currentPage };
  set pageIndex(value: number) {
    this._pages.currentPage = value;
  }

  //total page number
  get totalPages(): number {
    return Math.ceil(this.length / this.size);
  }

  //previous page
  prevPage: number;

  constructor(
    public _pages: PaginationService
  ) { }

  next(): void {
    this.prevPage = this.pageIndex;
    this.pageIndex++
    this.dataEmitter();
  }

  prev(): void {
    this.prevPage = this.pageIndex;
    this.pageIndex--
    this.dataEmitter();
  }

  dataEmitter(): void {
    return this.data.emit({
      prevPage: this.prevPage,
      length: this.length,
      pageIndex: this.pageIndex,
      size: this.size
    })
  }

}
