import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-recipe-card-saved',
  imports: [CommonModule, RouterModule],
  templateUrl: './recipe-card-saved.component.html',
  styleUrls: ['./recipe-card-saved.component.css', '../my-recipes/my-recipes.component.css', '../../styles.css'],
})
export class RecipeCardSavedComponent {
  @Input() recipe: any;

  trackByCategory(index: number, cat: string) {
  return cat;
}

}
