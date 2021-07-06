import { Component } from '@angular/core';
import { Configuration } from './entities/configuration.interface';
import { AppConfigService } from './services/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'HeroesWeb';
  config: Configuration;
  
  constructor(appConfig: AppConfigService) {
    this.config = appConfig.configuration!;
  }
}
