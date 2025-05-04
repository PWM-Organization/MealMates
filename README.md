Asegurarse de tener node y npm instalados

sudo npm install -g @angular/cli

npm install

ng serve -o PWM-Angular


### 📁 Estructura

```bash
PWM-Angular/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── blog-recipes-list/
│   │   │   │   ├── blog-recipes-list.component.css
│   │   │   │   ├── blog-recipes-list.component.html
│   │   │   │   └── blog-recipes-list.component.ts
│   │   │   ├── categories/
│   │   │   │   └── ...
│   │   │   └── ...
│   │   ├── guards/
│   │   │   ├── auth.guard.ts
│   │   │   └── public-pages.guard.ts
│   │   ├── pages/
│   │   │   ├── blog/
│   │   │   │   ├── blog.component.css
│   │   │   │   ├── blog.component.html
│   │   │   │   └── blog.component.ts
│   │   │   ├── forgot-password/
│   │   │   │   └── ...
│   │   │   └── ...
│   │   ├── services/
│   │   │   ├── auth.services.ts
│   │   │   ├── storage.service.ts
│   │   │   └── user-data.service.ts
│   │   └── app-config.server.ts
│   │   └── app.cofig.ts
│   │   └── app.routes.server.ts
│   │   └── app.routes.ts
│   │   └── firebase.config.ts
│   ├── models/
│   │   ├── Recipe.ts
│   │   ├── UserProfile.ts
│   ├── main.ts
│   ├── main.server.ts
│   ├── server.ts
│   ├── index.html
│   └── styles.css
```