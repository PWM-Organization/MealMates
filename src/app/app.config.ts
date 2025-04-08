import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideDatabase, getDatabase } from '@angular/fire/database';

const firebaseConfig = {
  apiKey: "AIzaSyCvpDJ4-iBYkRCn7zquz889D5lN9hb1E3s",
  authDomain: "pwm-angular.firebaseapp.com",
  databaseURL: "https://pwm-angular-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "pwm-angular",
  storageBucket: "pwm-angular.firebasestorage.app",
  messagingSenderId: "202980994346",
  appId: "1:202980994346:web:7822e81b05b8cfdc2a8253",
  measurementId: "G-6JYX61GH6V"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideClientHydration(withEventReplay()),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideDatabase(() => getDatabase())
  ]
};
