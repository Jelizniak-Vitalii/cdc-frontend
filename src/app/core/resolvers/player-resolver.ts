import { Injectable } from "@angular/core";
import { Observable, take } from "rxjs";
import { AudioService } from "../services/audio.service";

@Injectable({
  providedIn: 'root'
})
export class PlayerResolver {
  constructor(
    public audioService: AudioService,
  ) {}

  resolve(): Observable<any>|Promise<any>|any {
    return this.audioService.currentFile.pipe(take(1));
  }
}
