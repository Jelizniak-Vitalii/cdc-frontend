import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Observable, take} from "rxjs";
import {AudioService} from "../services/audio.service";

@Injectable({
  providedIn: 'root'
})

export class PlayerResolver {
  constructor(
    public audioService: AudioService,
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>|Promise<any>|any {
    return this.audioService.currentFile.pipe(take(1));
  }
}
