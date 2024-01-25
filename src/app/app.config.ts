import { provideAnimations } from "@angular/platform-browser/animations";
import { TuiRootModule } from "@taiga-ui/core";
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideAnimations(), provideRouter(routes), importProvidersFrom(TuiRootModule), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"shopweb24s","appId":"1:1060761610412:web:af56fd6a0712469b185709","storageBucket":"shopweb24s.appspot.com","apiKey":"AIzaSyCVuICNc9v3-oApEEyTDd0Ds7fGZvz0aRA","authDomain":"shopweb24s.firebaseapp.com","messagingSenderId":"1060761610412"}))), importProvidersFrom(provideAuth(() => getAuth())), importProvidersFrom(provideFirestore(() => getFirestore()))]
};
