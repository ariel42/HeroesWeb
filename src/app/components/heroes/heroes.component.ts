import { Component, OnInit } from '@angular/core';
import { Hero } from 'src/app/entities/hero.interface';
import { ApiService } from 'src/app/services/api.service';
import { AppConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  myHeroes: Hero[] = [];
  otherHeroes: Hero[] = [];
  constructor(
    private apiService: ApiService,
    private appConfig: AppConfigService
  ) { }

  ngOnInit(): void {
    this.apiService.getHeroes().subscribe(heroes => {
      this.myHeroes = [];
      this.otherHeroes = [];
      heroes.sort((x, y) => x.currentPower - y.currentPower).forEach(hero => {
        const array = hero.trainerName === this.appConfig.configuration?.loggedInUser ?
          this.myHeroes :
          this.otherHeroes;
        array.push(hero);
      });
    }, e => alert(e?.error || e));
  }

  generateNewHero() {
    const power = 1 + this.randInt(9);
    const hero: Partial<Hero> = {
      currentPower: power,
      isAttacker: Math.random() < 0.5,
      isDefender: Math.random() < 0.5,
      name: this.names[this.randInt(this.names.length - 1)],
      startingPower: power,
      suitPart1Color: '#' + this.randInt(256 ** 3).toString(16).padStart(6, "0"),
      suitPart2Color: '#' + this.randInt(256 ** 3).toString(16).padStart(6, "0"),
      suitPart3Color: '#' + this.randInt(256 ** 3).toString(16).padStart(6, "0")
    }
    this.apiService.createHero(hero).subscribe(newHero => {
      this.myHeroes.push(newHero);
    }, e => alert(e?.error || e));
  }

  private randInt(max: number) {
    return Math.trunc(Math.random() * (max + 1))
  }

  readonly names = [
    "Alice", "Arthur", "Bob", "Brown", "Bertha", "Carol", "Carlos", "Charlie", "Carole", "Chuck", "Craig",
    "Dan", "Dave", "David", "Erin", "Eve", "Frank", "Faythe", "Grace", "Green", "Gray", "Heidi", "Honey"
  ]
}
