# MealMates

[![Angular Version](https://img.shields.io/badge/Angular-v19.2.6-DD0031?logo=angular)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7+-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Firebase](https://img.shields.io/badge/Firebase-Platform-FFCA28?logo=firebase)](https://firebase.google.com/)

MealMates es una aplicación web desarrollada con Angular y Firebase, diseñada para facilitar la gestión de recetas y la planificación semanal de comidas.

**Asignatura:** Programación Web y Móvil
**Fecha:** 4 Mayo 2025

**Autores:**

-   Elena Artiles Morales
-   Pablo Monzón Toca
-   Francisco Javier López-Dufour Morales

## ✨ Características Principales

-   **Autenticación de Usuarios:** Registro, inicio de sesión y recuperación de contraseña seguros utilizando Firebase Authentication.
-   **Gestión Completa de Recetas:**
    -   Crear, leer, actualizar y eliminar (CRUD) recetas personales (`my-recipes`).
    -   Explorar recetas públicas o de un blog (`blog`).
    -   Visualización detallada de cada receta (`recipe/:id`).
    -   Subida de imágenes para las recetas (Firebase Storage).
-   **Planificador Semanal (`weekly-planner`):** Organiza tus comidas para la semana asignando recetas a días específicos.
-   **Gestión de Perfil (`profile`):** Visualiza y gestiona la información del perfil de usuario.
-   **Diseño Responsivo:** Interfaz adaptable a diferentes tamaños de pantalla.

## 🛠️ Tecnologías Utilizadas

-   **Frontend:** Angular (v19+), TypeScript, HTML5, CSS/SASS
-   **Backend & Base de Datos:** Firebase (Firestore, Authentication, Storage)
-   **Enrutamiento:** Angular Router
-   **Gestión de Estado:** Servicios de Angular y RxJS para manejar el estado y los flujos de datos asíncronos.

## 📁 Estructura del Proyecto

El código fuente se encuentra principalmente en la carpeta `src/app`:

```
src/app/
├── components/      # Componentes reutilizables (cards, header, footer, days-grid, etc.)
├── guards/          # Guards para proteger rutas (auth.guard, public-pages.guard)
├── models/          # Interfaces TypeScript para los modelos de datos (Recipe, UserProfile)
├── pages/           # Componentes principales de cada página/ruta (login, recipe, weekly-planner, etc.)
├── services/        # Lógica de negocio y comunicación con Firebase (AuthService, UserDataService, StorageService)
├── app.config.ts    # Configuración principal de la aplicación
├── app.routes.ts    # Definición de las rutas de la aplicación
└── firebase.config.example.ts # Ejemplo de configuración de Firebase
```

## 🔥 Estructura de Datos en Firebase (Firestore)

La aplicación utiliza Firestore para almacenar los datos principales. La estructura esperada incluye colecciones como:

-   `users`: Almacena información del perfil de cada usuario registrado (asociado al UID de Authentication).
-   `recipes`: Contiene los detalles de todas las recetas (tanto públicas como creadas por usuarios), posiblemente incluyendo un campo `userId` para las recetas personales.
-   `weeklyPlans` (o similar): Guarda la planificación semanal de comidas asociada a cada usuario (e.g., por `userId`).

Firebase Storage se utiliza para almacenar las imágenes asociadas a las recetas, generalmente organizadas en carpetas (e.g., `recipe-images/`).

## 🚀 Cómo Empezar

Sigue estos pasos para configurar y ejecutar el proyecto localmente:

1.  **Requisitos Previos:**

    -   Node.js y npm (o yarn) instalados.
    -   Angular CLI instalado globalmente: `sudo npm install -g @angular/cli`

2.  **Clonar el repositorio:**

    ```bash
    git clone <URL_DEL_REPOSITORIO>
    cd MealMates-angular
    ```

3.  **Instalar dependencias:**

    ```bash
    npm install
    ```

4.  **Configurar Firebase:**

    -   Crea un proyecto en [Firebase Console](https://console.firebase.google.com/).
    -   Dentro de tu proyecto Firebase, activa:
        -   **Firestore Database**
        -   **Authentication** (habilita el proveedor Email/Password)
        -   **Storage**
    -   Ve a la configuración de tu proyecto (Project settings) > Tus apps (Your apps) > Web.
    -   Obtén el objeto de configuración de Firebase (`firebaseConfig`).
    -   Renombra el archivo `src/firebase.config.example.ts` a `src/firebase.config.ts`.
    -   Copia y pega tu objeto `firebaseConfig` dentro de `src/firebase.config.ts`, reemplazando el placeholder.

5.  **Ejecutar la aplicación:**
    ```bash
    ng serve -o
    ```
    La aplicación se compilará y se abrirá automáticamente en tu navegador en `http://localhost:4200/`.

## 📄 Licencia

(Opcional: Si tienes una licencia, menciónala aquí. Ej: Este proyecto está bajo la Licencia MIT.)
