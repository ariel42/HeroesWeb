import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from "./config.service";
import { Hero } from "../entities/hero.interface";
import { tap } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class ApiService {
  private get apiBaseUrl(): string {
    return this.appConfig.configuration!.apiBaseUrl;
  }

  constructor(
    private http: HttpClient,
    private appConfig: AppConfigService
  ) { }

  getHeroes() {
    return this.http.get<Hero[]>(this.apiBaseUrl + "/heroes").pipe(
      tap(heros => heros.forEach(h => this.parseHero(h)))
    );
  }

  trainHero(hero: Hero) {
    return this.http.put<Hero>(`${this.apiBaseUrl}/heroes/${hero.id}/training`, hero).pipe(
      tap(h => this.parseHero(h))
    );
  }

  saveHero(hero: Partial<Hero>) {
    return this.http.post<Hero>(`${this.apiBaseUrl}/heroes`, hero).pipe(
      tap(h => this.parseHero(h))
    );
  }

  private parseHero(hero: Hero) {
    hero.firstTrainingDate = hero.firstTrainingDate && new Date(hero.firstTrainingDate)
  }
}
