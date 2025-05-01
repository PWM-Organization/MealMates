import { Component } from '@angular/core';
import { BlogRecipesListComponent } from '../components/blog-recipes-list/blog-recipes-list.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [BlogRecipesListComponent, RouterModule],
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css', '../../styles.css']
})
export class IndexComponent {

}
