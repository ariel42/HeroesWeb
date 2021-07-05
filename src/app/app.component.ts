import { Component } from '@angular/core';
import { AppConfigService } from './services/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'HeroesWeb';

  constructor(appConfig: AppConfigService) {
    console.log(appConfig.configuration);
  }
}
