# Documentación: Gestión del Estado de Autenticación del Usuario

Este documento detalla cómo la aplicación gestiona y comparte el estado de autenticación del usuario (si está conectado o no) de forma reactiva y centralizada.

## El Problema: Compartir el Estado

Cuando un usuario inicia o cierra sesión, múltiples partes de la aplicación necesitan saberlo para actualizar la interfaz (ej., el header, las opciones de menú, el acceso a rutas protegidas). Pasar esta información manualmente entre componentes es complejo y propenso a errores.

## La Solución: Un Servicio Centralizado y Observables

Utilizamos el `AuthService` no solo para realizar las peticiones, sino también para actuar como la **fuente única de verdad** sobre el estado de autenticación. Esto se logra mediante un **Observable**.

### El Observable `authState$`

`@angular/fire/auth` proporciona la función `authState(auth)`. Esta función devuelve un Observable que emite automáticamente cada vez que cambia el estado de autenticación en Firebase:

-   Emite el objeto `User` de Firebase si el usuario **inicia sesión**.
-   Emite `null` si el usuario **cierra sesión**.
-   Emite el estado actual ( `User` o `null`) tan pronto como te suscribes.

En nuestro `AuthService`, exponemos este Observable:

```typescript
// src/app/services/auth.service.ts
import { Injectable, inject } from '@angular/core';
import { Auth, authState, User } from '@angular/fire/auth'; // Importamos User
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private auth: Auth = inject(Auth);

    // Observable público que emite el estado de autenticación
    readonly authState$: Observable<User | null> = authState(this.auth);

    // ... métodos login, register, logout ...
}
```

El `readonly` y el sufijo `$` son convenciones para indicar que es un Observable público.

### Consumo Reactivo en Componentes

Cualquier componente que necesite conocer el estado de autenticación puede simplemente inyectar `AuthService` y obtener este observable.

**Ejemplo 1: `AppComponent` (Componente Raíz)**

El `AppComponent` obtiene el observable y lo pasa a otros componentes (como `HeaderComponent`) o lo usa en su propia plantilla.

```typescript
// src/app.component.ts
import { Component, inject } from '@angular/core';
import { AuthService } from './app/services/auth.service';
// ... otros imports

@Component({
    selector: 'app-root',
    // ...
})
export class AppComponent {
    private authService = inject(AuthService);

    // Expone el observable del servicio para usarlo en la plantilla
    user$ = this.authService.authState$;
}
```

**Ejemplo 2: Uso en Plantillas con `async` Pipe**

La forma más común y recomendada de usar el observable en las plantillas HTML es con la `async` pipe (`| async`). Esta pipe se suscribe automáticamente al observable y devuelve el último valor emitido (`User` o `null`). También se desuscribe automáticamente cuando el componente se destruye, evitando fugas de memoria.

```html
<!-- src/app.component.html -->
<!-- Pasamos el valor actual del observable al header -->
<app-header [user]="user$ | async" />
<router-outlet />
<app-footer />
```

```html
<!-- src/app/header/header.component.html -->
<header class="header">
    <!-- ... -->
    <nav class="navigation">
        <ul>
            <li><a routerLink="/blog">Blog</a></li>
            <!-- Usamos *ngIf con el valor obtenido del Input 'user' -->
            <ng-container *ngIf="user; else loggedOutNav">
                <li><a routerLink="/my-recipes">Mis recetas</a></li>
                <li><a routerLink="/weekly-planner">Menú Semanal</a></li>
            </ng-container>
            <ng-template #loggedOutNav>
                <li><a routerLink="/login">Mis recetas</a></li>
                <li><a routerLink="/login">Menú Semanal</a></li>
            </ng-template>
        </ul>
    </nav>
    <div class="user-icon">
        <!-- ... -->
        <div class="user-menu-header">
            <ng-container *ngIf="user; else guestHeader">
                <!-- Mostramos el email si hay usuario -->
                <a routerLink="/profile" class="user-text">{{ user.email }}</a>
            </ng-container>
            <ng-template #guestHeader>
                <a routerLink="/login" class="guest-text">Invitado</a>
            </ng-template>
        </div>
        <!-- ... resto del menú condicional ... -->
    </div>
</header>
```

### Ventajas de este Enfoque

-   **Centralizado:** La lógica de estado está en un solo lugar (`AuthService`).
-   **Reactivo:** Los componentes reaccionan automáticamente a los cambios de estado sin lógica manual compleja.
-   **Eficiente:** La `async` pipe maneja suscripciones y desuscripciones.
-   **Mantenible:** Fácil de entender y modificar.

## Persistencia de la Sesión

Es importante destacar que Firebase Authentication **maneja la persistencia de la sesión automáticamente**. Cuando un usuario inicia sesión, Firebase guarda la información de la sesión (generalmente en IndexedDB en navegadores modernos). Si el usuario cierra la pestaña y la vuelve a abrir, `authState$` emitirá automáticamente el objeto `User` porque Firebase detecta la sesión persistente. Igualmente, al llamar a `logout()`, Firebase limpia esa sesión persistente y `authState$` emitirá `null`.
