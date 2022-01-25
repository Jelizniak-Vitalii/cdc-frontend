import {Component, OnDestroy, OnInit} from '@angular/core';
import {StreamState} from "../../interfaces/stream-state";
import {AudioService} from "../../services/audio.service";
import {CloudService} from "../../services/cloud.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit, OnDestroy {
  state: StreamState | undefined;
  currentFile: any = null;
  files: Array<any> = [];
  isActive = false;
  componentDestroy$ = new Subject();

  constructor(
    public audioService: AudioService,
    public cloudService: CloudService,
    private _routes: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.currentFile = this._routes.snapshot.data['currentFile'];
    if (!this.currentFile) {
      this.currentFile = JSON.parse(localStorage.getItem('currentFile')!);
    }

    this.cloudService.getFiles()
      .pipe(takeUntil(this.componentDestroy$))
      .subscribe(files => {
      this.files = files;
    });

    this.audioService.getState()
      .pipe(takeUntil(this.componentDestroy$))
      .subscribe(state => {
        this.state = state;
      });
  }

  playStream(url: string) {
    this.audioService.playStream(url)
      .pipe(takeUntil(this.componentDestroy$))
      .subscribe(() => {});
  }

  back() {
    this.stop();
    this.currentFile = null;
    localStorage.removeItem('currentFile');
    this.audioService.resetState();
    this.isActive = false;
    this.router.navigate(['/home']);
  }

  pause() {
    this.audioService.pause();
  }

  play() {
    if (!this.isActive) {
      this.isActive = true;
      return this.playStream(this.currentFile.file.url)
    }
    this.audioService.play();
  }

  stop() {
    this.audioService.stop();
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
    this.cloudService.currentFile.next(null);
    this.componentDestroy$.next(true);
    this.componentDestroy$.complete();
  }
}
