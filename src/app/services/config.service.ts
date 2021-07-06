import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { switchMap, tap } from "rxjs/operators";
import { ApiConfiguartion } from "../entities/api-configuration.interface";
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
      switchMap(config => this.http.get<ApiConfiguartion>(config.apiBaseUrl + "/configuration")),
      tap(apiConfig => this._configuration!.api = apiConfig)
    );
    return loader;
  }
}
