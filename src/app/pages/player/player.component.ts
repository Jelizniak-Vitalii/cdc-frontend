import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Subject} from "rxjs";
import { takeUntil } from "rxjs/operators";

import { StreamState } from "../../core/interfaces";
import { AudioService } from "../../core/services/audio.service";


@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('chantText') chantText: ElementRef | undefined;

  state: StreamState | undefined;
  currentFile: any = null;
  files: Array<any> = [];
  isActive = false;
  componentDestroy$ = new Subject();

  constructor(
    public audioService: AudioService,
    private _routes: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.currentFile = this._routes.snapshot.data['currentFile'];
    if (!this.currentFile) {
      this.currentFile = JSON.parse(localStorage.getItem('currentFile')!);
    }

    this.audioService.getState()
      .pipe(takeUntil(this.componentDestroy$))
      .subscribe(state => {
        this.state = state;
      });
  }

  ngAfterViewInit(): void {
    if (this.chantText) {
      this.chantText.nativeElement.innerHTML = this.currentFile.file.text;
    }
    this.cdr.markForCheck();
  }

  playStream(url: string) {
    this.audioService.playStream(url)
      .pipe(takeUntil(this.componentDestroy$))
      .subscribe(() => {
        this.cdr.markForCheck();
      });

  }

  back() {
    this.stop();
    this.currentFile = null;
    localStorage.removeItem('currentFile');
    this.audioService.resetState();
    this.isActive = false;
    this.router.navigate(['/Liste-de-chansons']);
  }

  pause() {
    this.audioService.pause();
    this.cdr.markForCheck();
  }

  play() {
    if (!this.isActive) {
      this.isActive = true;
      return this.playStream(this.currentFile.file.url)
    }
    this.audioService.play();
    this.cdr.markForCheck();
  }

  stop() {
    this.audioService.stop();
    this.cdr.markForCheck();
  }

  next() {
    const index = this.currentFile.index + 1;
    const file = this.files[index];
    // this.openFile(file, index);
  }

  previous() {
    const index = this.currentFile.index - 1;
    const file = this.files[index];
    // this.openFile(file, index);
  }

  isFirstPlaying() {
    return this.currentFile.index === 0;
  }

  isLastPlaying() {
    return this.currentFile.index === this.files.length - 1;
  }

  onSliderChangeEnd(change: any) {
    this.audioService.seekTo(change.value);
  }

  ngOnDestroy(): void {
    this.audioService.currentFile.next(null);
    this.componentDestroy$.next(true);
    this.componentDestroy$.complete();
  }
}
