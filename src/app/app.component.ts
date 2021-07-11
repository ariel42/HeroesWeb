import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Configuration } from './entities/configuration.interface';
import { ApiService } from './services/api.service';
import { AppConfigService } from './services/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'HeroesWeb';
  config: Configuration;

  constructor(
    appConfig: AppConfigService,
    private apiService: ApiService,
    private router: Router
  ) {
    this.config = appConfig.configuration!;
  }

  ngOnInit() {
    const route = this.config.loggedInUser ? "heroes" : "login";
    this.router.navigate([route]);
  }

  logout() {
    this.apiService.logout();
  }
}
