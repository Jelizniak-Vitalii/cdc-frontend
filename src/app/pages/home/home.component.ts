import {Component, OnDestroy, OnInit} from '@angular/core';
import {AudioService} from "../../services/audio.service";
import {CloudService} from "../../services/cloud.service";
import {Router} from "@angular/router";
import {FormControl} from "@angular/forms";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  files: Array<any> = [];
  componentDestroy$ = new Subject();

  search = new FormControl('');

  constructor(
    public audioService: AudioService,
    public cloudService: CloudService,
    private router: Router

  ) {}

  ngOnInit(): void {
    this.getAllSongs();
    this.search.valueChanges
      .pipe(takeUntil(this.componentDestroy$))
      .subscribe(res => {
        if (!res) return this.getAllSongs();
        this.files = this.files.filter(item => {
          return item.name.toLowerCase().includes(res.toLowerCase());
        })
    })
  }

  getAllSongs() {
    this.cloudService.getFiles()
      .pipe(takeUntil(this.componentDestroy$))
      .subscribe(files => {
      this.files = files;
    });
  }

  openFile(file: { url: string; }, index: any) {
    this.cloudService.currentFile.next({file, index} as any);
    localStorage.setItem('currentFile', JSON.stringify({file, index}))
    this.router.navigate(['/player']);
  }

  ngOnDestroy(): void {
    this.componentDestroy$.next(true);
    this.componentDestroy$.complete();
  }

}
