import { Component, Input, OnInit } from '@angular/core';
import { Hero } from 'src/app/entities/hero.interface';
import { ApiService } from 'src/app/services/api.service';
import { AppConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.scss']
})
export class HeroCardComponent implements OnInit {
  @Input() hero?: Hero;
  maxTraingPerDay: number;

  constructor(
    private apiService: ApiService,
    appConfig: AppConfigService
  ) {
    this.maxTraingPerDay = appConfig.configuration!.api.maxTrainingPerDay;
  }

  ngOnInit(): void {
  }

  trainHero(hero: Hero) {
    this.apiService.trainHero(hero).subscribe(hero => {
      this.hero = hero
    }, e => alert(e?.error || e?.message || e));
  }
}
