import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideEnvironmentNgxMask } from 'ngx-mask';
import { provideHttpClient } from '@angular/common/http';
import { withInterceptors } from '@angular/common/http';
import { authTokenInterceptor } from './services/auth-token-interceptor';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideEnvironmentNgxMask(),
    provideHttpClient(withInterceptors([
      authTokenInterceptor // Aqui você lista seus interceptadores
    ]))
  ]
};
