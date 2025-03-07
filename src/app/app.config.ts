import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import Aura from '@primeng/themes/aura';
import { authInterceptor } from './shared/service/auth.service';


export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])), //added the function here,
    providePrimeNG({
      ripple: true,
        theme: {
          preset: Aura,
          options: {
            // darkModeSelector: '.my-app-dark',
            cssLayer: {
              name: 'primeng',
              order: 'tailwind, primeng',
            },
          },
        },
      }),
    provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(withEventReplay())]
};
  