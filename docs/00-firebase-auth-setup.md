# Documentación: Integración de Firebase Authentication en Angular

Este documento describe la configuración y el uso de Firebase Authentication dentro de la aplicación Angular, utilizando la librería `@angular/fire`.

## 1. Uso de la Librería `@angular/fire`

`@angular/fire` es la librería oficial para integrar Firebase con Angular. Proporciona una serie de módulos y servicios que facilitan la interacción con los diferentes productos de Firebase (Authentication, Firestore, Storage, etc.) de una manera idiomática para Angular, aprovechando Observables y la inyección de dependencias.

En este proyecto, utilizamos principalmente:
-   `@angular/fire/app`: Para la inicialización y configuración base de Firebase.
-   `@angular/fire/auth`: Para interactuar con el servicio de Firebase Authentication.

La librería se integra en la configuración principal de la aplicación (`app.config.ts`) mediante providers específicos.

## 2. Configuración de Firebase

La configuración de Firebase se realiza en dos pasos principales:

### a) Archivo de Configuración (`src/app/firebase.config.ts`)

Se ha creado un archivo dedicado para almacenar las credenciales y la configuración del proyecto Firebase. Es **crucial** reemplazar los valores placeholder con las credenciales reales obtenidas desde la consola de Firebase.

```typescript
// src/app/firebase.config.ts
export const firebaseConfig = {
  apiKey: 'TU_API_KEY', // Reemplaza con tu API Key
  authDomain: 'TU_AUTH_DOMAIN', // Reemplaza con tu Auth Domain
  projectId: 'TU_PROJECT_ID', // Reemplaza con tu Project ID
  storageBucket: 'TU_STORAGE_BUCKET', // Reemplaza con tu Storage Bucket
  messagingSenderId: 'TU_MESSAGING_SENDER_ID', // Reemplaza con tu Messaging Sender ID
  appId: 'TU_APP_ID', // Reemplaza con tu App ID
};
```
*(Nota: Este archivo debe añadirse al `.gitignore` si contiene credenciales sensibles y el repositorio es público).*

### b) Inicialización en `app.config.ts`

La aplicación Firebase y el servicio de autenticación se inicializan y proveen globalmente en `src/app/app.config.ts` utilizando los providers de `@angular/fire`:

```typescript
// src/app/app.config.ts
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
// Asegúrate de que este archivo exista o elimina la línea si no es necesario
// import { firebaseConfig } from './firebase.config'; 

// O, si prefieres definir la configuración aquí directamente (menos recomendado para credenciales):
const firebaseConfig = { /* ... tus credenciales ... */ };

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideClientHydration(withEventReplay()),
        // Inicializa Firebase con la configuración importada o definida
        provideFirebaseApp(() => initializeApp(firebaseConfig)), 
        // Provee el servicio de autenticación de Firebase
        provideAuth(() => getAuth()), 
    ],
};
```

## 3. Servicio de Autenticación (`AuthService`)

Se ha creado un servicio `AuthService` (`src/app/services/auth.service.ts`) para encapsular toda la lógica relacionada con la autenticación de usuarios.

### Propósito

-   Abstraer la interacción directa con la librería `@angular/fire/auth`.
-   Proporcionar una API sencilla para el registro, inicio de sesión, cierre de sesión y observación del estado de autenticación.
-   Ser inyectable en cualquier componente o servicio que necesite funcionalidades de autenticación.

### Métodos Principales

-   `authState$: Observable<User | null>`: Un Observable que emite el estado actual de autenticación del usuario. Emite el objeto `User` de Firebase si el usuario está autenticado, o `null` si no lo está. Es ideal para reaccionar a cambios en el estado de sesión.
-   `register({ email, password })`: Registra un nuevo usuario utilizando email y contraseña. Devuelve una Promesa que se resuelve con las credenciales del usuario (`UserCredential`) en caso de éxito o se rechaza con un error.
    ```typescript
    register({ email, password }: any): Promise<UserCredential> {
      return createUserWithEmailAndPassword(this.auth, email, password);
    }
    ```
-   `login({ email, password })`: Inicia sesión con un usuario existente mediante email y contraseña. Devuelve una Promesa que se resuelve con `UserCredential` en caso de éxito o se rechaza con un error.
    ```typescript
    login({ email, password }: any): Promise<UserCredential> {
      return signInWithEmailAndPassword(this.auth, email, password);
    }
    ```
-   `logout()`: Cierra la sesión del usuario actualmente autenticado. Devuelve una Promesa que se resuelve cuando el cierre de sesión se completa.
    ```typescript
    logout(): Promise<void> {
      return signOut(this.auth);
    }
    ```

### Uso

Para utilizar el servicio, simplemente inyéctalo en el constructor de tu componente o servicio usando la función `inject`:

```typescript
import { Component, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  // ...
})
export class ExampleComponent {
  private authService = inject(AuthService);
  currentUser$ = this.authService.authState$; // Observar estado

  async onLogin(credentials: any) {
    try {
      await this.authService.login(credentials);
      console.log('¡Inicio de sesión exitoso!');
      // Redirigir o actualizar UI
    } catch (error) {
      console.error('Error de inicio de sesión:', error);
      // Mostrar mensaje de error
    }
  }

  async onLogout() {
    try {
      await this.authService.logout();
      console.log('Sesión cerrada.');
      // Redirigir o actualizar UI
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }
}
```
