import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class HttpService {

  url: string = environment.url;

  constructor(
    private http: HttpClient
  ) {}

  getAllChants() {
    return this.http.get(`${this.url}allChants`);
  }

  getChantByName(name: string) {
    return this.http.post(`${this.url}getChantsByName`, {name});
  }
}
