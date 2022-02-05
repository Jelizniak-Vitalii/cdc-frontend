import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  spinnerStatus = new Subject<boolean>();

  private spinCounter = 0;

  show() {
    this.spinCounter++;
    this.spinnerStatus.next(true);
  }

  hide() {
    this.spinCounter--;
    if (this.spinCounter <= 0) {
      this.spinnerStatus.next(false);
    }
  }
}
