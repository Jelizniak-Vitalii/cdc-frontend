import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {SpinnerService} from "../services/spinner.service";

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpinnerComponent implements OnDestroy {
  componentDestroy$ = new Subject();

  spinnerStatus = false;

  constructor(
    private spinner: SpinnerService,
    private cdr: ChangeDetectorRef,
  ) {
    this.spinner.spinnerStatus
      .pipe(takeUntil(this.componentDestroy$))
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
