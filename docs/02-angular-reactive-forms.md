# Documentación: Uso de Formularios Reactivos en Angular

Este documento explica cómo utilizamos los Formularios Reactivos (`ReactiveFormsModule`) de Angular para manejar la entrada de datos del usuario en el componente de inicio de sesión (`LoginComponent`).

## ¿Por Qué Formularios Reactivos?

Los formularios reactivos ofrecen un enfoque basado en modelos (model-driven) para manejar formularios. Son más explícitos y escalables que los formularios de plantilla (`FormsModule`), especialmente para formularios complejos o cuando se necesita lógica de validación personalizada o pruebas unitarias más sencillas. El estado del formulario se gestiona de forma inmutable en el componente TypeScript.

## Pasos Clave en `LoginComponent`

### 1. Importar Módulos Necesarios

Para usar formularios reactivos, necesitamos importar `ReactiveFormsModule` en el componente standalone o en el módulo correspondiente. También importamos `FormBuilder` y `Validators` para ayudarnos a crear y validar el formulario.

```typescript
// src/app/login/login.component.ts
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
// Imports clave para formularios reactivos
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Necesario para *ngIf
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        RouterModule,
        ReactiveFormsModule, // ¡Importante!
        CommonModule,
    ],
    // ... resto del componente
})
export class LoginComponent {
    /* ... */
}
```

### 2. Crear el Modelo del Formulario en el Componente

Utilizamos `FormBuilder` (inyectado con `inject`) para crear una instancia de `FormGroup`. Un `FormGroup` agrupa varios `FormControl`.

-   Cada `FormControl` representa un campo del formulario (email, password).
-   Al crear cada `FormControl`, especificamos:
    -   El valor inicial (ej., `''`).
    -   Validadores síncronos (ej., `Validators.required`, `Validators.email`) o asíncronos.

```typescript
// src/app/login/login.component.ts
export class LoginComponent {
    // Inyectamos FormBuilder
    private fb = inject(FormBuilder);
    private authService = inject(AuthService);
    private router = inject(Router);

    // Definición del FormGroup llamado 'loginForm'
    loginForm = this.fb.group({
        // FormControl para 'email'
        email: ['', [Validators.required, Validators.email]], // Valor inicial vacío, validadores requerido y email
        // FormControl para 'password'
        password: ['', Validators.required], // Valor inicial vacío, validador requerido
    });

    loginError: string | null = null;

    // ... onSubmit() ...
}
```

### 3. Vincular el Modelo a la Plantilla HTML

Usamos directivas específicas de `ReactiveFormsModule` en el HTML:

-   **`[formGroup]`**: Vincula el elemento `<form>` al `FormGroup` (`loginForm`) definido en el componente.
-   **`formControlName`**: Vincula cada elemento `<input>` a su `FormControl` correspondiente dentro del `FormGroup` (por nombre: `"email"`, `"password"`).

```html
<!-- src/app/login/login.component.html -->
<!-- Vinculamos el form al FormGroup 'loginForm' -->
<form class="login-form" [formGroup]="loginForm" (ngSubmit)="onSubmit()">
    <div class="form-group">
        <label for="email">Email</label>
        <div class="input-with-icon">
            <i class="fas fa-envelope"></i>
            <!-- Vinculamos este input al FormControl 'email' -->
            <input type="email" id="email" placeholder="tu@email.com" formControlName="email" required />
        </div>
        <!-- ... mensajes de validación ... -->
    </div>

    <div class="form-group">
        <label for="password">Contraseña</label>
        <div class="input-with-icon">
            <i class="fas fa-lock"></i>
            <!-- Vinculamos este input al FormControl 'password' -->
            <input type="password" id="password" placeholder="••••••••" formControlName="password" required />
        </div>
        <!-- ... mensajes de validación ... -->
    </div>

    <!-- ... error de Firebase, botón ... -->
    <button type="submit" class="login-button" [disabled]="loginForm.invalid">Iniciar Sesión</button>
</form>
```

### 4. Manejar el Envío del Formulario

La directiva `(ngSubmit)` en el elemento `<form>` se vincula al método `onSubmit()` del componente. Este método se ejecuta cuando el usuario envía el formulario.

Dentro de `onSubmit()`:

-   Podemos acceder a los valores del formulario usando `this.loginForm.value`.
-   Podemos verificar si el formulario es válido usando `this.loginForm.valid` o `this.loginForm.invalid`.

```typescript
// src/app/login/login.component.ts
export class LoginComponent {
    // ... loginForm ...
    loginError: string | null = null;

    async onSubmit() {
        this.loginError = null;
        // Detener si el formulario no es válido
        if (this.loginForm.invalid) {
            // Opcional: marcar todos los campos como 'touched' para mostrar errores
            // this.loginForm.markAllAsTouched();
            return;
        }

        // Accedemos a los valores de los controles
        const email = this.loginForm.value.email ?? '';
        const password = this.loginForm.value.password ?? '';

        try {
            await this.authService.login({ email, password });
            this.router.navigate(['/']);
        } catch (error: any) {
            // ... manejo de error ...
        }
    }
}
```

### 5. Mostrar Mensajes de Validación

Podemos mostrar mensajes de error específicos basados en el estado de cada `FormControl`.

-   Accedemos al control usando `loginForm.controls.nombreControl` (o `loginForm.get('nombreControl')`).
-   Verificamos propiedades como `invalid`, `touched` (el usuario interactuó), `dirty` (el valor cambió).
-   Verificamos qué error específico falló usando la propiedad `errors` (ej., `errors?.['required']`, `errors?.['email']`).
-   Usamos `*ngIf` para mostrar/ocultar los mensajes.

```html
<!-- src/app/login/login.component.html -->
<div class="form-group">
    <label for="email">Email</label>
    <div class="input-with-icon">
        <i class="fas fa-envelope"></i>
        <input type="email" id="email" placeholder="tu@email.com" formControlName="email" required />
    </div>
    <!-- Mensajes de error para el control 'email' -->
    <div
        *ngIf="loginForm.controls.email.invalid && (loginForm.controls.email.dirty || loginForm.controls.email.touched)"
        class="error-message"
    >
        <!-- Mensaje si falla la validación 'required' -->
        <span *ngIf="loginForm.controls.email.errors?.['required']">El email es obligatorio.</span>
        <!-- Mensaje si falla la validación 'email' -->
        <span *ngIf="loginForm.controls.email.errors?.['email']">Introduce un email válido.</span>
    </div>
</div>
```

Este enfoque proporciona un control robusto sobre los formularios, su estado y su validación, directamente desde el código TypeScript.
