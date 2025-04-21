# Documentación: Vinculación con Características de Angular (Binding)

Este documento explica cómo conectamos la lógica de nuestros componentes TypeScript con las plantillas HTML utilizando las características de vinculación (binding) de Angular.

Angular ofrece varias formas de vincular datos y eventos entre el componente y su vista (template).

## 1. Vinculación de Propiedad (`[property]`)

Permite pasar datos **desde el componente hacia la plantilla**. Se usa para establecer el valor de propiedades de elementos HTML, directivas o propiedades `@Input` de componentes hijos.

La sintaxis es usar corchetes `[]` alrededor de la propiedad del elemento/componente.

**Ejemplo 1: Deshabilitar un botón (`[disabled]`)**

En `LoginComponent`, deshabilitamos el botón de envío si el formulario no es válido.

```typescript
// src/app/login/login.component.ts
export class LoginComponent {
    // ...
    loginForm = this.fb.group({
        /* ... */
    });
    // La propiedad loginForm.invalid será true o false
}
```

```html
<!-- src/app/login/login.component.html -->
<form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
    <!-- ... inputs ... -->
    <!-- Vinculamos la propiedad 'disabled' del botón al estado 'invalid' del formulario -->
    <button type="submit" class="login-button" [disabled]="loginForm.invalid">Iniciar Sesión</button>
</form>
```

**Ejemplo 2: Pasar datos a un componente hijo (`@Input`)**

En `AppComponent`, pasamos el estado del usuario al `HeaderComponent` a través de una propiedad de entrada (`@Input`) llamada `user`.

```typescript
// src/app.component.ts
export class AppComponent {
    user$ = this.authService.authState$; // Observable
}
```

```html
<!-- src/app.component.html -->
<!-- Usamos async pipe para obtener el valor del observable -->
<!-- Vinculamos la propiedad 'user' del app-header al valor del observable -->
<app-header [user]="user$ | async" />
```

```typescript
// src/app/header/header.component.ts
export class HeaderComponent {
    // Declaramos la propiedad de entrada 'user'
    @Input() user: User | null = null;
}
```

## 2. Vinculación de Evento (`(event)`)\*\*

Permite ejecutar código en el componente **en respuesta a un evento que ocurre en la plantilla** (como un clic, un envío de formulario, etc.).

La sintaxis es usar paréntesis `()` alrededor del nombre del evento.

**Ejemplo 1: Manejar envío de formulario (`(ngSubmit)`)**

En `LoginComponent`, ejecutamos el método `onSubmit()` cuando el formulario se envía.

```html
<!-- src/app/login/login.component.html -->
<!-- Cuando el evento 'ngSubmit' del formulario ocurre, se llama a onSubmit() -->
<form class="login-form" [formGroup]="loginForm" (ngSubmit)="onSubmit()">
    <!-- ... -->
</form>
```

```typescript
// src/app/login/login.component.ts
export class LoginComponent {
    // ...
    onSubmit() {
        // Lógica a ejecutar al enviar el formulario
        console.log('Formulario enviado!');
        // ... (llamada a authService.login)
    }
}
```

**Ejemplo 2: Manejar clic en un botón (`(click)`)**

En `HeaderComponent`, ejecutamos el método `logout()` cuando se hace clic en el botón de cerrar sesión.

```html
<!-- src/app/header/header.component.html -->
<ng-container *ngIf="user">
    <!-- ... otros items ... -->
    <!-- Cuando ocurre el evento 'click' en este enlace, se llama a logout() -->
    <a (click)="logout()" class="menu-item logout">
        <i class="fas fa-sign-out-alt"></i>
        Cerrar sesión
    </a>
</ng-container>
```

```typescript
// src/app/header/header.component.ts
export class HeaderComponent {
    // ...
    async logout() {
        // Lógica a ejecutar al hacer clic
        console.log('Cerrando sesión...');
        // ... (llamada a authService.logout)
    }
}
```

## 3. Interpolación (`{{ expression }}`)

Es una forma especial de vinculación de propiedad unidireccional (componente a plantilla) que permite mostrar valores del componente como texto dentro del HTML.

La sintaxis es usar dobles llaves `{{ }}`.

**Ejemplo: Mostrar el email del usuario**

En `HeaderComponent`, mostramos el email del usuario si está conectado.

```typescript
// src/app/header/header.component.ts
export class HeaderComponent {
    @Input() user: User | null = null;
}
```

```html
<!-- src/app/header/header.component.html -->
<ng-container *ngIf="user">
    <!-- Mostramos el valor de la propiedad 'email' del objeto 'user' -->
    <a routerLink="/profile" class="user-text">{{ user.email }}</a>
</ng-container>
```

## 4. Vinculación Bidireccional (`[(ngModel)]`) - (No usado aquí, pero relevante)

Combina la vinculación de propiedad y evento para crear una sincronización de datos en dos direcciones. Se usa principalmente con formularios de plantilla (`FormsModule`), no con los formularios reactivos (`ReactiveFormsModule`) que hemos implementado aquí. Su sintaxis es `[(ngModel)]="property"`.

Estas técnicas de vinculación son fundamentales en Angular para crear interfaces dinámicas e interactivas.
