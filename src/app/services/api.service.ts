import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from "./config.service";
import { Hero } from "../entities/hero.interface";
import { catchError, tap } from "rxjs/operators";
import { Router } from "@angular/router";
import { of } from "rxjs";

@Injectable({ providedIn: "root" })
export class ApiService {
  private get apiBaseUrl(): string {
    return this.appConfig.configuration!.apiBaseUrl;
  }

  constructor(
    private http: HttpClient,
    private appConfig: AppConfigService,
    private router: Router
  ) { }

  getHeroes() {
    return this.http.get<Hero[]>(this.apiBaseUrl + "/heroes").pipe(
      tap(heroes => heroes.forEach(h => this.parseHero(h)))
    );
  }

  trainHero(hero: Hero) {
    return this.http.put<Hero>(`${this.apiBaseUrl}/heroes/${hero.id}/training`, hero).pipe(
      tap(h => this.parseHero(h))
    );
  }

  createHero(hero: Partial<Hero>) {
    return this.http.post<Hero>(`${this.apiBaseUrl}/heroes`, hero).pipe(
      tap(h => this.parseHero(h))
    );
  }

  updateHero(hero: Partial<Hero>) {
    return this.http.put<Hero>(`${this.apiBaseUrl}/heroes/${hero.id}`, hero).pipe(
      tap(h => this.parseHero(h))
    );
  }

  login(username: string, password: string) {
    return this.http.post(this.apiBaseUrl + "/users/login", {
      username,
      password
    }).pipe(
      tap(() => this.appConfig.configuration!.loggedInUser = username)
    );
  }

  signup(username: string, password: string) {
    return this.http.post(this.apiBaseUrl + "/users", {
      username,
      password
    }).pipe(
      tap(() => this.appConfig.configuration!.loggedInUser = username)
    );
  }

  logout() {
    this.http.post(`${this.apiBaseUrl}/users/logout`, {}).pipe(
      catchError(() => {
        this.deleteAllCookies();
        return of({});
      })
    ).subscribe(() => {
      this.afterLogout();
    });
  }

  private parseHero(hero: Hero) {
    hero.firstTrainingDate = hero.firstTrainingDate && new Date(hero.firstTrainingDate)
  }

  private deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      var eqPos = cookie.indexOf("=");
      var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  }

  private afterLogout() {
    this.appConfig.configuration!.loggedInUser = undefined;
    this.router.navigate(["/login"]);
  }
}
