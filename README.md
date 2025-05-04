# MealMates 🍲

[![Angular Version](https://img.shields.io/badge/Angular-v19.2.6-DD0031?logo=angular)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7+-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Firebase](https://img.shields.io/badge/Firebase-Platform-FFCA28?logo=firebase)](https://firebase.google.com/)

**MealMates** es una aplicación web desarrollada con Angular y Firebase pensada para planificar tus comidas semanales y gestionar recetas personalizadas de forma eficiente y visual.

**📚 Asignatura:** Programación Web y Móvil  

**📅 Fecha de entrega:** 4 Mayo 2025

**👨‍💻 Autores:**
- Elena Artiles Morales  
- Pablo Monzón Toca  
- Francisco Javier López-Dufour Morales

---

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

---

## 🔥 Estructura de Datos en Firebase

La aplicación utiliza Firestore para almacenar los datos principales. La estructura esperada incluye colecciones como:

-   `users`: Almacena información del perfil de cada usuario registrado (asociado al UID de Authentication).
-   `recipes`: Contiene los detalles de todas las recetas (tanto públicas como creadas por usuarios), posiblemente incluyendo un campo `userId` para las recetas personales.
-   `weeklyPlans` (o similar): Guarda la planificación semanal de comidas asociada a cada usuario (e.g., por `userId`).

Firebase Storage se utiliza para almacenar las imágenes asociadas a las recetas, generalmente organizadas en carpetas (e.g., `recipe-images/`).

## 🚀 Cómo Empezar

### 1. Requisitos Previos

- Node.js y npm instalados.
- Angular CLI:
  ```bash
  npm install -g @angular/cli
  ```

### 2. Clonar el repositorio

```bash
git clone https://github.com/PWM-Organization/MealMates.git
cd MealMates-angular
```

### 3. Instalar dependencias

```bash
npm install
```

### 4. Configurar Firebase

1. Crea un proyecto en [Firebase Console](https://console.firebase.google.com/)
2. Activa:
   - **Firestore**
   - **Authentication (Email/Password)**
   - **Storage**
3. En Firebase Console, ve a Project Settings > Configuración Web.
4. Copia el objeto `firebaseConfig`.

Renombra el archivo:

```bash
mv src/firebase.config.example.ts src/firebase.config.ts
```

Pega tu configuración en el archivo recién renombrado.

### 5. Iniciar la aplicación

```bash
ng serve
```

Abre tu navegador y ve a `http://localhost:4200/`.

### 6. Compilar para Producción

```bash
ng build --prod
```
Esto generará una carpeta `dist/` con los archivos listos para producción.

---

## 📄 Licencia

Este proyecto se entrega en el marco académico de la Universidad de Las Palmas de Gran Canaria.
