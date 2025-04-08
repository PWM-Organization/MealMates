# Documentación: Uso de Firebase Storage para Imágenes de Perfil

Este documento explica cómo se utiliza Firebase Storage en la aplicación para permitir a los usuarios subir y mostrar una imagen de perfil.

## El Servicio de Almacenamiento (`StorageService`)

De forma similar al `AuthService` y `UserDataService`, hemos creado un `StorageService` (`src/app/services/storage.service.ts`) para encapsular la lógica de interacción con Firebase Storage.

### Dependencias

El servicio inyecta `Storage` de `@angular/fire/storage` y `AuthService` para obtener el UID del usuario actual.

```typescript
// src/app/services/storage.service.ts
import { Injectable, inject } from '@angular/core';
import {
    Storage,
    ref, // Para crear referencias a ubicaciones en Storage
    uploadBytes, // Para subir archivos
    getDownloadURL, // Para obtener la URL pública de un archivo subido
} from '@angular/fire/storage';
import { AuthService } from './auth.service';
import { Observable, from, switchMap } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class StorageService {
    private storage: Storage = inject(Storage);
    private authService: AuthService = inject(AuthService);
    // ... métodos
}
```

### Método Principal: `uploadProfileImage`

Este método se encarga de subir un archivo de imagen seleccionado por el usuario.

```typescript
// Dentro de StorageService
uploadProfileImage(file: File): Observable<string> {
  // 1. Obtener el estado de autenticación
  return this.authService.authState$.pipe(
    switchMap((user) => {
      if (!user) {
        throw new Error('User not logged in for image upload!');
      }
      // 2. Definir la ruta en Firebase Storage
      // Usamos el UID del usuario para crear una carpeta única para él.
      // Nombrar el archivo siempre igual (ej: profile.jpg) hace que se sobrescriba al subir uno nuevo.
      const filePath = `profile_images/${user.uid}/profile.jpg`;
      // 3. Crear una referencia a esa ruta
      const storageRef = ref(this.storage, filePath);

      // 4. Subir el archivo usando uploadBytes
      // uploadBytes devuelve una Promise, la convertimos a Observable con from()
      return from(uploadBytes(storageRef, file)).pipe(
        // 5. Una vez subido, obtener la URL de descarga
        switchMap((uploadResult) => {
          // getDownloadURL también devuelve una Promise, la convertimos
          return from(getDownloadURL(uploadResult.ref));
        })
      );
    })
  );
}
```

**Flujo del método:**

1.  Se asegura de que el usuario esté autenticado.
2.  Define una ruta única en Storage usando el UID del usuario (ej., `profile_images/ABCD123XYZ/profile.jpg`). Esto organiza las imágenes y facilita encontrarlas.
3.  Crea una referencia a esa ubicación específica en Storage.
4.  Utiliza `uploadBytes` para subir el archivo a esa referencia. Como `uploadBytes` devuelve una `Promise`, usamos `from()` de RxJS para convertirla en un `Observable`.
5.  Una vez que la subida se completa (`uploadBytes` se resuelve), usamos `switchMap` para encadenar otra operación asíncrona: obtener la URL de descarga pública de la imagen recién subida usando `getDownloadURL`. De nuevo, convertimos la `Promise` devuelta por `getDownloadURL` a un `Observable` con `from()`.
6.  El `Observable` final emitirá la URL de descarga (un string) cuando todo el proceso termine.

## Integración en `ProfileComponent`

El `ProfileComponent` utiliza este servicio de la siguiente manera:

### 1. Selección de Archivo

Se usa un input de tipo `file` oculto en el HTML. Un botón visible (`<button>` o `<label>`) simula el clic en este input oculto.

```html
<!-- src/app/profile/profile.component.html -->
<div class="profile-image-section">
    <div class="profile-image">
        <img [src]="profile?.photoURL || 'assets/default-profile.png'" ... />
        <!-- Input oculto -->
        <input type="file" #fileInput hidden (change)="onFileSelected($event)" accept="image/png, image/jpeg" />
        <!-- Botón visible que activa el input -->
        <button type="button" class="change-photo" (click)="fileInput.click()" ...>
            <i class="fas fa-camera"></i> ...
        </button>
    </div>
    ...
</div>
```

El evento `(change)` del input llama al método `onFileSelected` en el componente.

### 2. Manejo del Evento `onFileSelected`

Este método obtiene el archivo seleccionado del evento y llama a otro método para iniciar la subida.

```typescript
// src/app/profile/profile.component.ts
onFileSelected(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0] && this.currentUser) {
    const file = input.files[0];
    this.uploadProfilePicture(file);
  }
}
```

### 3. Subida y Actualización

El método `uploadProfilePicture` llama a `storageService.uploadProfileImage`.

```typescript
// src/app/profile/profile.component.ts
uploadProfilePicture(file: File): void {
  if (!this.currentUser) return;

  this.uploadingImage = true; // Indica estado de carga
  this.uploadError = null;
  const currentUid = this.currentUser.uid;

  this.storageService.uploadProfileImage(file).pipe(
    // Una vez obtenida la URL desde StorageService...
    switchMap(downloadURL => {
      // ... la usamos para actualizar el campo photoURL en el perfil de Firestore
      return this.userDataService.updateUserProfile({ uid: currentUid, photoURL: downloadURL });
    })
  ).subscribe({
    next: () => {
      this.uploadingImage = false;
      // La imagen en la UI se actualizará automáticamente porque
      // el observable profile$ detectará el cambio en Firestore.
    },
    error: (err) => {
      this.uploadingImage = false;
      this.uploadError = 'Error al subir la imagen.';
      console.error(err);
    }
  });
}
```

**Flujo:**

1.  Se llama a `storageService.uploadProfileImage` con el archivo.
2.  Este servicio sube la imagen a Firebase Storage y devuelve un `Observable` con la URL de descarga.
3.  Usamos `switchMap` para tomar esa URL y llamar a `userDataService.updateUserProfile`, pasándole un objeto que solo contiene el `uid` y la nueva `photoURL`. Esto actualiza el documento del usuario en Firestore.
4.  La suscripción maneja el estado de carga y los posibles errores.

### 4. Visualización de la Imagen

La imagen se muestra en el HTML usando la URL guardada en el perfil de Firestore.

```html
<!-- src/app/profile/profile.component.html -->
<img [src]="profile?.photoURL || 'assets/default-profile.png'" ... />
```

Se utiliza el operador `?.` (optional chaining) y el operador `||` para mostrar una imagen por defecto si `profile` o `photoURL` aún no están disponibles.
