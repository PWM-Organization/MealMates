import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-my-recipes',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './my-recipes.component.html',
  styleUrls: ['./my-recipes.component.css', '../../styles.css'],
})
export class MyRecipesComponent {

}
