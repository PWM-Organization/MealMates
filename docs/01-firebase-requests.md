# Documentación: Realización de Peticiones a Firebase Authentication

Este documento explica cómo la aplicación interactúa con Firebase Authentication para registrar, iniciar sesión y cerrar sesión de usuarios, utilizando un servicio dedicado.

## El Servicio de Autenticación (`AuthService`)

Para centralizar y simplificar la comunicación con Firebase Authentication, hemos creado un servicio llamado `AuthService` (`src/app/services/auth.service.ts`). La idea principal es encapsular la lógica de Firebase en un solo lugar, haciendo que los componentes sean más limpios y fáciles de mantener.

### Inyección de Dependencias

`AuthService` utiliza la función `inject` de Angular para obtener una instancia del servicio `Auth` proporcionado por `@angular/fire/auth`. Este servicio `Auth` es el que realmente contiene los métodos para hablar con Firebase.

```typescript
// src/app/services/auth.service.ts
import { Injectable, inject } from '@angular/core';
import {
    Auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    authState,
} from '@angular/fire/auth';
// ... otros imports

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    // Inyectamos el servicio Auth de AngularFire
    private auth: Auth = inject(Auth);
    // ... resto del servicio
}
```

### Métodos Principales para Peticiones

El `AuthService` expone métodos sencillos que los componentes pueden llamar:

1.  **`register({ email, password })`**: Para registrar un nuevo usuario.

    -   Recibe un objeto con `email` y `password`.
    -   Internamente, llama a `createUserWithEmailAndPassword(this.auth, email, password)` de Firebase.
    -   Devuelve una `Promise` que se resuelve si el registro es exitoso o se rechaza si hay un error (ej., email ya en uso).

    ```typescript
    // Dentro de AuthService
    register({ email, password }: any) {
      // Llama a la función de Firebase
      return createUserWithEmailAndPassword(this.auth, email, password);
    }
    ```

2.  **`login({ email, password })`**: Para iniciar sesión.

    -   Recibe `email` y `password`.
    -   Llama a `signInWithEmailAndPassword(this.auth, email, password)` de Firebase.
    -   Devuelve una `Promise` que se resuelve si el login es correcto o se rechaza si las credenciales son inválidas.

    ```typescript
    // Dentro de AuthService
    login({ email, password }: any) {
      // Llama a la función de Firebase
      return signInWithEmailAndPassword(this.auth, email, password);
    }
    ```

3.  **`logout()`**: Para cerrar la sesión.

    -   Llama a `signOut(this.auth)` de Firebase.
    -   Devuelve una `Promise` que se resuelve cuando la sesión se cierra.

    ```typescript
    // Dentro de AuthService
    logout() {
      // Llama a la función de Firebase
      return signOut(this.auth);
    }
    ```

### Uso en Componentes

Los componentes, como `LoginComponent` o `HeaderComponent`, inyectan `AuthService` y simplemente llaman a estos métodos, sin necesidad de conocer los detalles internos de Firebase.

```typescript
// Ejemplo en LoginComponent (src/app/login/login.component.ts)
import { Component, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
// ... otros imports

export class LoginComponent {
    private authService = inject(AuthService);
    // ... definición del formulario

    async onSubmit() {
        // ... validación del formulario ...
        const email = this.loginForm.value.email ?? '';
        const password = this.loginForm.value.password ?? '';

        try {
            // Llamada simple al método del servicio
            await this.authService.login({ email, password });
            // ... manejar éxito (redirección)
        } catch (error: any) {
            // ... manejar error (mostrar mensaje)
        }
    }
}
```

De esta forma, la lógica de las peticiones a Firebase está encapsulada y reutilizable.
