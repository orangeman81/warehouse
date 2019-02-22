import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  currentPage: number = 0;
  currentSize: number;
  currentLength: number;

  constructor() { }

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
}
