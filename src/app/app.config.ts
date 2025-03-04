import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideStore } from '@ngxs/store';
import { routes } from './app.routes';
import { ViewState } from './store/view/view.state';
import { PlayerState } from './store/player/player.state';
import { TimeState } from './store/time/time.state';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
    provideStore([ViewState, PlayerState, TimeState]),
  ]
};
