import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import {first, Subject, takeUntil} from "rxjs";
import { SpinnerService } from "../../services/spinner.service";

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpinnerComponent implements OnDestroy {
  componentDestroy$ = new Subject();

  spinnerStatus: boolean = false;

  constructor(
    private spinner: SpinnerService,
    private cdr: ChangeDetectorRef,
  ) {
    this.spinner.spinnerStatus
      .pipe(
        first(),
        takeUntil(this.componentDestroy$)
      )
      .subscribe((next: boolean) => {
      this.spinnerStatus = next;
      this.cdr.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this.componentDestroy$.next(true);
    this.componentDestroy$.complete();
  }
}
