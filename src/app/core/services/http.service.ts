import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import {Chants} from "../interfaces/chants.interface";

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  url: string = environment.url;

  constructor(
    private http: HttpClient
  ) {}

  getAllChants() {
    return this.http.get<Chants[]>(`${this.url}allChants`);
  }

  getChantByName(name: string) {
    return this.http.post<Chants[]>(`${this.url}getChantsByName`, {name});
  }
}
