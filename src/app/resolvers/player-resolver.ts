import {Injectable} from "@angular/core";
import {CloudService} from "../services/cloud.service";
import {ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Observable, take} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class PlayerResolver {
  constructor(
    private cloudService: CloudService,
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>|Promise<any>|any {
    return this.cloudService.currentFile.pipe(take(1));
  }
}
