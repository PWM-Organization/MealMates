import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-recipe-card-default',
  imports: [CommonModule, RouterModule],
  templateUrl: './recipe-card-default.component.html',
  styleUrls: ['./recipe-card-default.component.css', '../my-recipes/my-recipes.component.css', '../../styles.css'],
})
export class RecipeCardDefaultComponent {
  @Input() recipe: any;

  trackByCategory(index: number, cat: string) {
  return cat;
}

}

