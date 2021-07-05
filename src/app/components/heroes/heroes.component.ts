import { Component, OnInit } from '@angular/core';
import { Hero } from 'src/app/entities/hero.interface';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getHeroes().subscribe(heroes => {
      this.heroes = heroes.sort((x, y) => x.currentPower - y.currentPower);
    }, e => alert(e?.message || e));
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
    this.apiService.saveHero(hero).subscribe(newHero => {
      this.heroes.push(newHero);
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
