import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-generator',
  standalone: true,
  imports: [],
  templateUrl: './recipe-generator.component.html',
  styleUrls: ['./recipe-generator.component.css', '../../styles.css'],
})
export class RecipeGeneratorComponent {
  private router: Router = inject(Router);
  onCancel() {
    this.router.navigate(['/my-recipes']);
  }
}
