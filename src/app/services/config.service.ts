import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { switchMap, tap } from "rxjs/operators";
import { ApiDetails } from "../entities/api-details.interface";
import { Configuration } from "../entities/configuration.interface";

@Injectable({ providedIn: "root" })
export class AppConfigService {
  constructor(
    private http: HttpClient
  ) { }

  private _configuration: Configuration | undefined;
  get configuration(): Configuration | undefined {
    return this._configuration;
  }

  loadAppConfig() {
    const loader = this.http.get<Configuration>('../assets/config.json').pipe(
      tap(config => this._configuration = config),
      switchMap(config => this.http.get<ApiDetails>(config.apiBaseUrl + "/app/details")),
      tap(apiDetails => this._configuration!.api = apiDetails)
    );
    return loader;
  }
}
