import { Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RegisterComponent } from './register/register.component';
import { BlogComponent } from './blog/blog.component';
import { RecipeComponent } from './recipe/recipe.component';
import { ProfileComponent } from './profile/profile.component';
import { RecipeGeneratorComponent } from './recipe-generator/recipe-generator.component';
import { WeeklyPlannerComponent } from './weekly-planner/weekly-planner.component';
import { MyRecipesComponent } from './my-recipes/my-recipes.component';

export const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'recipe', component: RecipeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'recipe-generator', component: RecipeGeneratorComponent },
  { path: 'weekly-planner', component: WeeklyPlannerComponent },
  { path: 'my-recipes', component: MyRecipesComponent },
];
