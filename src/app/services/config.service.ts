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
    let apiBaseUrl: string;
    const loader = this.http.get<Configuration>('../assets/config.json').pipe(
      tap(config => apiBaseUrl = config.apiBaseUrl),
      switchMap(() => this.http.get<ApiConfiguartion>(apiBaseUrl + "/configuration")),
      tap(apiConfig => {
        this._configuration = {
          apiBaseUrl,
          maxTrainingPerDay: apiConfig.maxTrainingPerDay,
          loggedInUser: apiConfig.loggedInUser
        }
      })
    );
    return loader;
  }
}
