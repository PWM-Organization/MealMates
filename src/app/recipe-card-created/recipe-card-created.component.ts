import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-recipe-card-created',
  imports: [CommonModule, RouterModule],
  templateUrl: './recipe-card-created.component.html',
  styleUrls: ['./recipe-card-created.component.css', '../my-recipes/my-recipes.component.css', '../../styles.css'],
})
export class RecipeCardCreatedComponent {
  @Input() recipe: any;

  trackByCategory(index: number, cat: string): string {
    return cat;
  }
}
