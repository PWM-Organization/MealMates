import { Component } from '@angular/core';
import { BlogRecipesListComponent } from '../blog-recipes-list/blog-recipes-list.component';
import { CategoriesComponent } from '../categories/categories.component';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [BlogRecipesListComponent, CategoriesComponent],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css', '../../styles.css']
})
export class BlogComponent {

}
