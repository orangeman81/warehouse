import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  pageSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  pageSub: Subscription;
  currentPage: number;
  currentSize: number;
  currentLength: number;

  constructor() { }

  init() {
    this.pageSub = this.pageSubject
      .subscribe(p => {
        this.currentPage = p;
      })
  }

  getNumberOfPages(): number {
    return Math.ceil(this.currentLength / this.currentSize) - 1;
  }

  /** Whether there is a previous page. */
  hasPreviousPage(): boolean {
    return this.currentPage >= 1 && this.currentSize != 0;
  }

  /** Whether there is a next page. */
  hasNextPage(): boolean {
    const numberOfPages = this.getNumberOfPages();
    return this.currentPage < numberOfPages && this.currentSize != 0;
  }

  closeSub() {
    this.pageSub.unsubscribe();
  }
}
