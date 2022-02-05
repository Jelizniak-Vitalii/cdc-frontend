import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormControl} from "@angular/forms";
import {debounceTime, distinctUntilChanged, finalize, Subject } from "rxjs";
import {takeUntil} from "rxjs/operators";
import {HttpService} from "../../core/services/http.service";
import {SpinnerService} from "../../core/services/spinner.service";
import {AudioService} from "../../core/services/audio.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit, OnDestroy {
  private isChantsLoaded = false;
  private files: Array<any> = [];
  private componentDestroy$ = new Subject();
  private search = new FormControl('');

  constructor(
    public audioService: AudioService,
    private httpService: HttpService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private spinner: SpinnerService,
  ) {}

  ngOnInit() {
    this.spinner.show();
    this.getAllSongs();

    this.search.valueChanges
      .pipe(
        takeUntil(this.componentDestroy$),
        debounceTime(700),
        distinctUntilChanged()
      )
      .subscribe(res => {
        this.spinner.show();
        if (!res) return this.getAllSongs();
        this.getChantByName(res);
      })
  }

  getChantByName(value: string) {
    this.httpService.getChantByName(value)
      .pipe(
        takeUntil(this.componentDestroy$),
        finalize(() => this.spinner.hide())
      )
      .subscribe(res => {
        this.files = res;
        this.cdr.markForCheck();
      })
  }

  getAllSongs() {
    this.httpService.getAllChants()
      .pipe(
        takeUntil(this.componentDestroy$),
        finalize(() => this.spinner.hide())
      )
      .subscribe(item => {
        this.files = item;
        this.isChantsLoaded = true;
        this.cdr.markForCheck();
      })

  }

  openFile(file: { url: string; }, index: any) {
    this.audioService.currentFile.next({file, index} as any);
    localStorage.setItem('currentFile', JSON.stringify({file, index}))
    this.router.navigate(['/player']);
  }

  ngOnDestroy(): void {
    this.componentDestroy$.next(true);
    this.componentDestroy$.complete();
  }
}
