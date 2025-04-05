import { Component } from '@angular/core';
import { BlogRecipesListComponent } from '../blog-recipes-list/blog-recipes-list.component';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [BlogRecipesListComponent],
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css', '../../styles.css']
})
export class IndexComponent {

}
